import axios from 'axios';
import { toast } from 'react-toastify';

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// Kỹ thuật dùng css pointer-event để chặn user click nhanh tại bất kỳ chỗ nào có hành động click gọi api
// Đây là một kỹ thuật rất hay tận dụng Axios Interceptors và CSS Pointer-event để chỉ phải viết code xử lý một lần cho toàn bộ dự án
// Cách sử dụng: Với tất cả các link hoặc button mà có hành động call api thì thêm class 'tqd-send' cho nó là xong.
const updateSendingApiStatus = (sending = true) => {
  const submits = document.querySelectorAll('.tqd-send')
  for (let i = 0; i < submits.length; i++) {
    if (sending) submits[i].classList.add('tqd-waiting')
    else submits[i].classList.remove('tqd-waiting')
  }
}

// https://axios-http.com/docs/interceptors
// Add a request interceptor - can thiệp vào giữa request gửi đi
authorizedAxiosInstance.interceptors.request.use(
  function (config) {
    updateSendingApiStatus(true)
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
    updateSendingApiStatus(false)
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    updateSendingApiStatus(false)

    let errorMessage = error?.message;
    if (error.response?.data?.errors) {
      errorMessage = error.response?.data?.errors;
    }
    toast.error(errorMessage)
    return Promise.reject(error)
  }
);

export default authorizedAxiosInstance
