import { ResponseRejection } from "../HttpClient/ResponseRejection";
import { ResponseResolution } from "../HttpClient/ResponseResolution";

interface HttpClient {
  properties: {
    baseUrl: string
  },

  get: (url: string, config?: object) => Promise<any>,

  post: (url: string, payload: object, config?: object) => Promise<any>,

  postFormData: (url: string, payload: FormData, config?: object) => Promise<any>,

  extractFromResolution: (onfullfilled: object) => ResponseResolution;
  
  extractFromRejection: (onrejection: any) => ResponseRejection;
}

export default HttpClient;