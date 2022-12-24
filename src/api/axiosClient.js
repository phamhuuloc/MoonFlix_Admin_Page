import axios from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
  baseURL: "https://movieserverapi.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use((config) => {
  // Handle token here ...
  let accessToken = window.localStorage.getItem("token");
  if (accessToken) {
    // config.headers.token = `Bearer ${accessToken}`;
    config.headers.common['Authorization'] = `Bearer ${accessToken}` 
  }

  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
