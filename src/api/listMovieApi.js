import axiosClient from "./axiosClient";

const listMovieApi = {
  getListMovie() {
    const url = "/lists";
    return axiosClient.get(url);
  },
  createListMovie(list) {
    const url = "create/list";
    return axiosClient.post(url, list);
  },
  updateListMovie(id, list) {
    const url = `api/list/update/${id}`;
    return axiosClient.post(url, list);
  },

  deleteListMovie(id) {
    const url = `/lists/delete/${id}`;
    return axiosClient.post(url);
  },
};
export default listMovieApi;
