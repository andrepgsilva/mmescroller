import { defineStore } from "pinia";
import axiosHttpClient from "../custom/AxiosHttpClient";
import Cookies from 'js-cookie'
import HttpClient from "../custom/types/interfaces/HttpClient";
import { useUserStore } from '../stores/user';
  
// const userStore = useUserStore();

const httpClient: HttpClient = axiosHttpClient;
httpClient.properties.baseUrl = 'http://localhost:80';

export const useHomeStore = defineStore({
  id: "home",
  state: () => ({
    isUserLoggedIn: false,
    isLoading: false,
    selectedImage: null,
    validationForm: {
      postName: '',
      postCategory: ''
    },
    userStore: useUserStore(),
    posts: [],
  }),
  getters: {},
  actions: {
    setLoadingHasStarted() {
      this.isLoading = true;
    },

    setLoadingHasFinished() {
      this.isLoading = false;
    },

    setPosts(posts: Array<Object>) {
      this.posts = posts;
    },

    async getAllPosts() {      
      this.setLoadingHasStarted();

      try {
        const token = Cookies.get('token');

        const response = await httpClient.get('/api/post', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const posts = httpClient.extractFromResolution(response).data;
        this.setPosts(posts);
      } catch(error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;

        this.userStore.refreshFlow(errorStatus, () => this.sendForm());
      } finally {
        // this.setLoadingHasFinished();
      }
    }
  },
});