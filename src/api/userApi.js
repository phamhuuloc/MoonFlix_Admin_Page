import axiosClient from "./axiosClient";

const userApi = {
  getUsersList() {
    const url = "/users";
    return axiosClient.get(url);
  },
  getSumRevenueOfMonth() {
    const url = "api/user/revenue";
    return axiosClient.get(url);
  },
  getNewUsers() {
    const url = "api/users?new=true";
    return axiosClient.get(url);
  },
  createNewUser(user) {
    const url = "api/user/create";
    return axiosClient.post(url, user);
  },

  updateUser(id, user) {
    const url = `api/user/update/${id}`;
    return axiosClient.post(url, user);
  },

  deleteUser(id) {
    const url = `api/user/delete/${id}`;
    return axiosClient.post(url);
  },
};
export default userApi;
