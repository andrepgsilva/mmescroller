import { defineStore } from "pinia";
import axiosHttpClient from "../custom/AxiosHttpClient";
import Cookies from 'js-cookie'
import HttpClient from "../custom/types/interfaces/HttpClient";
import { useUserStore } from '../stores/user';
import router from "../router";
  
// const userStore = useUserStore();

const httpClient: HttpClient = axiosHttpClient;
httpClient.properties.baseUrl = 'http://localhost:80';

export const useCreatePostStore = defineStore({
  id: "create-post",
  state: () => ({
    isUserLoggedIn: false,
    isLoading: false,
    selectedImage: null,
    validationForm: {
      postName: '',
      postCategory: ''
    },
    formForSend: new FormData,
    userStore: useUserStore()
  }),
  getters: {},
  actions: {
    setLoadingHasStarted() {
      this.isLoading = true;
    },

    setLoadingHasFinished() {
      this.isLoading = false;
    },

    setupUploadListener(inputElementQuery: string, postImagePreviewQuery: string) {
      const fileInput = document.querySelector(inputElementQuery) as HTMLInputElement;

      fileInput.addEventListener('change', function() {
          if (this.files && this.files[0]) {
            const img = document.querySelector(postImagePreviewQuery) as HTMLImageElement;
  
            img.onload = () => {
              URL.revokeObjectURL(img.src);
            }
            
            img.src = URL.createObjectURL(this.files[0]);
          }
      });
    },

    changePostImage($event) {
      this.selectedImage = $event.target.files[0];
      this.formForSend.append('file', this.selectedImage);
    },

    async sendForm() {
      this.formForSend.append('post_name', this.validationForm.postName);
      this.formForSend.append('post_category', this.validationForm.postCategory);
      this.formForSend.append('user_email', localStorage.getItem('email'));
      
      this.setLoadingHasStarted();
      try {
        const token = Cookies.get('token');

        const response = await httpClient.postFormData('/api/post', this.formForSend, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        router.push('/');
      } catch(error) {
        const errorStatus = httpClient.extractFromRejection(error).response.status;

        this.userStore.refreshFlow(errorStatus, () => this.sendForm());
      } finally {
        this.setLoadingHasFinished();
      }
    }
  },
});