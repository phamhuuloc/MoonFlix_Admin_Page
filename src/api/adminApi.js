import axiosClient from "./axiosClient";

const adminApi = {
  login(data) {
    const url = "api/user/login";
    return axiosClient.post(url, data);
  },
  getStats() {
    const url = "/api/user/status";
    return axiosClient.get(url);
  },
  getTopUser() {
    const url = "/api/user/top";
    return axiosClient.get(url);
  },

};
export default adminApi;
