import axios from 'axios';
import { ResponseRejection } from './types/HttpClient/ResponseRejection';
import { ResponseResolution } from './types/HttpClient/ResponseResolution';
import HttpClient from './types/interfaces/HttpClient';

const axiosHttpClient: HttpClient = {
  properties: {
    baseUrl: ''
  },

  get: function (url: string, config?: object): Promise<any> {
    return axios.get(this.properties.baseUrl + url, config);
  },

  post: function (url: string, payload: object, config?: object): Promise<any> {
    return axios.post(this.properties.baseUrl + url, payload, config);
  },

  extractFromResolution: function (onfullfilled: any): ResponseResolution {
    return {
      data: onfullfilled.data,
      headers: onfullfilled.headers,
      request: onfullfilled.request,
      status: onfullfilled.status,
    };
  },

  extractFromRejection: function (onrejection: any): ResponseRejection {
    return {
      response: onrejection.response,
      request: onrejection.request,
      message: onrejection.message,
      config: onrejection.config
    };
  },
  
  postFormData: function (url: string, payload: FormData, config?: object | undefined): Promise<any> {
    return axios.post(this.properties.baseUrl + url, payload, config);
  }
}

export default axiosHttpClient;