import axiosClient from "./axiosClient";

const list_movie_api = {
  addMovieIntoList(listMovie) {
    const url = "create/listMovie";
    return axiosClient.post(url, listMovie);
  },
  getAllMovieOflist(id){
      const url = `api/listMovie/${id}`;
      return axiosClient.get(url)
  },
  deleteMovieOfList(listMovie) {
    const url = `/listMovie/delete/movie`;
    return axiosClient.post(url,listMovie);
  },
};
export default list_movie_api;
