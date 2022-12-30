import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "movies";
    return axiosClient.get(url);
  },
  getTopMovies(){
    const url = "api/movies/top";
    return axiosClient.get(url)
  },
  getStats(id) {
    const url = `api/movie/status/${id}`;
    return axiosClient.get(url);
  },
  createMovie(movie) {
    const url = "/create/movie";
    return axiosClient.post(url,  movie );
  },
  updateMovie(id, movie) {
    const url = `api/movies/update/${id}`;
    return axiosClient.put(url, movie);
  },

  deleteMovie(id) {
    const url = `movie/delete/${id}`;
    return axiosClient.post(url);
  },
};
export default movieApi;
