import axios from 'axios';
import { toast } from 'react-toastify';

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// https://axios-http.com/docs/interceptors
// Add a request interceptor - can thiệp vào giữa request gửi đi
authorizedAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor -- can thiệp vào giữa response trả về
authorizedAxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    let errorMessage = error?.message;
    if (error.response?.data?.errors) {
      errorMessage = error.response?.data?.errors;
    }
    toast.error(errorMessage)
    return Promise.reject(error)
  }
);

export default authorizedAxiosInstance
