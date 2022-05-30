import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "api/movies";
    return axiosClient.get(url);
  },
  createMovie(movie) {
    const url = "api/movies/create";
    return axiosClient.post(url, { movie });
  },
  updateMovie(id, movie) {
    const url = `api/movies/update/${id}`;
    return axiosClient.put(url, { movie });
  },

  deleteMovie(id) {
    const url = `api/movies/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default movieApi;
