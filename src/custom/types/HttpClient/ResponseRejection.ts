export type ResponseRejection = {
  response: {
    data: Object,
    status: Number,
    headers: any
  },
  request: any,
  message: string,
  config: any
};