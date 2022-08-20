import { defineStore } from "pinia";
import axiosHttpClient from "../custom/AxiosHttpClient";
import Cookies from 'js-cookie'
import HttpClient from "../custom/types/interfaces/HttpClient";
import { useUserStore } from '../stores/user';

const httpClient: HttpClient = axiosHttpClient;
httpClient.properties.baseUrl = 'http://localhost:80';

export const usePostCategoriesStore = defineStore({
  id: "postcategories",
  state: () => ({
    categories: [],
    userStore: useUserStore()
  }),
  getters: {},
  actions: {
    setAllCategories(allCategories) {
      this.categories = allCategories;
    },

    async fetchCategories() {
      try {
        const token = Cookies.get('token');

        const response = await httpClient.get('/api/post-categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = httpClient.extractFromResolution(response).data;
        this.setAllCategories(data);

      } catch(error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;

        this.userStore.refreshFlow(errorStatus, () => this.fetchCategories());
      } finally {
        // this.setLoadingHasFinished();
      }
    }
  },
});