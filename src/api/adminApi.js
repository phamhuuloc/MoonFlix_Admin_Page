import axiosClient from "./axiosClient";

const adminApi = {
  login(data) {
    const url = "api/auth/login";
    return axiosClient.post(url, data);
  },
  getStats() {
    const url = "/api/users/stats";
    return axiosClient.get(url);
  },
  getTopUser() {
    const url = "/api/users/list/top";
    return axiosClient.get(url);
  },
};
export default adminApi;
