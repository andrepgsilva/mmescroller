import { defineStore } from "pinia";
import router from "../router/index";
import Cookies from 'js-cookie'
import axiosHttpClient from "../custom/AxiosHttpClient";
import HttpClient from "../custom/types/interfaces/HttpClient";
import { useNavbarStore } from '../stores/navbar';

const httpClient: HttpClient = axiosHttpClient;
httpClient.properties.baseUrl = 'http://localhost:80';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isUserLoggedIn: false,
    isLoading: false,
    authform: {
      user: {
        name: '',
        email: '',
        password: ''
      }
    },
  }),
  getters: {},
  actions: {
    clearForm() {
      this.authform = {
        user: {
          name: '',
          email: '',
          password: ''
        }
      };
    },

    setLoadingHasStarted() {
      this.isLoading = true;
    },

    setLoadingHasFinished() {
      this.isLoading = false;
    },

    setUserNotLoggedIn() {
      this.isUserLoggedIn = false;
    },

    setUserLoggedIn() {
      this.isUserLoggedIn = true;
    },

    authenticateUserOnClient() {
      const doesTheTokenExist = Cookies.get('token') !== undefined;
      const doesTheRefreshTokenExist = Cookies.set('refresh_token') !== undefined;
      const doesTheUsernameExist = localStorage.getItem('username') !== null;
      const doesTheUserEmailExist = localStorage.getItem('email') !== null;


      if (doesTheTokenExist && doesTheRefreshTokenExist && 
        doesTheUsernameExist && doesTheUserEmailExist) {
          return this.setUserLoggedIn();
      }

      this.setUserNotLoggedIn();
    },

    createCookiesForTokensPair(payload) {
      const { token, refreshToken } = payload;

      Cookies.set('token', token, { expires: 365 });
      Cookies.set('refresh_token', refreshToken, { expires: 365 });
    },

    deleteCookiesForTokensPair() {
      Cookies.remove('token');
      Cookies.remove('refresh_token');
    },

    setUserInformation(payload: { username: string, email: string }) {
      const { username, email } = payload;

      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
    },

    getAuthenticatedUserInformation() {
      return {
        'username': localStorage.getItem('username'),
        'email': localStorage.getItem('email'),
        'token': Cookies.get('token'),
        'refreshToken': Cookies.get('token'),
      }
    },

    async login() {
      const userInfo = {
        'email': this.authform.user.email,
        'password': this.authform.user.password
      };

      this.setLoadingHasStarted();

      try {
        const response = await httpClient.post('/api/auth/login', userInfo);
        const responseData = httpClient.extractFromResolution(response).data;
        const user = responseData.user;

        const { token, refresh_token: refreshToken } = responseData.authorization;

        this.createCookiesForTokensPair({ token, refreshToken });
        this.setUserInformation({ username: user.name, email: user.email });

        this.setUserLoggedIn();
        
        router.push('/');
      } catch (error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;
        return Promise.reject(errorStatus);
      } finally {
        this.setLoadingHasFinished();
        this.clearForm();
      }
    },

    async signUp() {
      const userInfo = {
        'name': this.authform.user.name,
        'email': this.authform.user.email,
        'password': this.authform.user.password
      };

      try {
        this.setLoadingHasStarted();
        const response = await httpClient.post('/api/auth/register', userInfo);
        const responseData = httpClient.extractFromResolution(response).data;
        const user = responseData.user;
        const { token, refresh_token: refreshToken } = responseData.authorization;

        this.createCookiesForTokensPair({ token, refreshToken });
        this.setUserInformation({ username: user.name, email: user.email });
        this.setUserLoggedIn();
        router.push('/');
      } catch (error) {
        return Promise.reject(false);
      } finally {
        this.setLoadingHasFinished();
        this.clearForm();
      }
    },

    async logout() {
      this.deleteCookiesForTokensPair();
      this.setUserInformation({ username: null, email: null });
      this.setUserNotLoggedIn();
      
      const navbarStore = useNavbarStore();
      navbarStore.setAuthenticatedOptionsAsNotCalled();


      try {
        this.setLoadingHasStarted();
        await httpClient.post('/api/auth/logout', {});
      } catch (error) {
        return Promise.reject(false);
      } finally {
        this.setLoadingHasFinished();
        router.push('/');
      }
    },

    async refresh() {
      const refreshTokenStored = Cookies.get('refresh_token');

      try {
        const response = await httpClient.post('/api/auth/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshTokenStored}`
          }
        });
        const responseData = httpClient.extractFromResolution(response).data;

        const { token, refresh_token: refreshToken } = responseData.authorization;

        this.createCookiesForTokensPair({ token, refreshToken });
        this.setUserLoggedIn();

      } catch (error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;
        return Promise.reject(errorStatus);
      }
    },

    async refreshFlow(statusCode, callback, callbackReject = null) {
      if (statusCode == 401) {
        try {
          await this.refresh();
          callback();
        } catch (error) {
          if (callbackReject === null) {
            this.setUserNotLoggedIn();

            router.push('/login');
          }
        }
      } else {
        this.setUserNotLoggedIn();
      }
    },

    async accessProtected() {
      const token = Cookies.get('token');

      try {
        const response = await httpClient.get('/api/test', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const responseData = httpClient.extractFromResolution(response).data;

        console.log(responseData);
      } catch (error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;

        this.refreshFlow(errorStatus, () => this.accessProtected());
      }
    },
  },
});
