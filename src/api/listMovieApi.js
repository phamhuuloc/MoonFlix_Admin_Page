import axiosClient from "./axiosClient";

const listMovieApi = {
  getListMovie() {
    const url = "api/list";
    return axiosClient.get(url);
  },
  createListMovie(list) {
    const url = "api/list/create";
    return axiosClient.post(url, list);
  },
  updateListMovie(id, list) {
    const url = `api/list/update/${id}`;
    return axiosClient.put(url, list);
  },

  deleteListMovie(id) {
    const url = `api/list/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default listMovieApi;
