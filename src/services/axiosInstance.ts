import axios from "axios";
import { Toast } from "app/shared";

export const _instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

_instance.interceptors.request.use(
  (config) => config,
  (error) => {
    // console.log({ error });
    // Do something with request error
    return Promise.reject(error);
  }
);

_instance.interceptors.response.use(
  (config) => {
    delete config.request;
    return config;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log({ config: error });
    const { message = "", isAxiosError = false, response } = error;
    const list: string[] = [];
    if (message && isAxiosError && !response) {
      return Toast({ message: message, type: "error" });
    } else if (response.status === 400) {
      return Toast({ message: response.data.message, type: "error" });
    } else if (response.status === 422) {
      const {
        data: { message, errors = {} },
      } = response;
      for (const key in errors) {
        list.push(errors[key]);
      }
      if (list.length) Toast({ message: list.join(), type: "error" });
      else Toast({ message, type: "error" });
    } else if (response.status === 500) {
      return Toast({ message: response.data.message, type: "error" });
    }
    return Promise.reject(error);
  }
);
