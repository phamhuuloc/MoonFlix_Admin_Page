import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./newListMovie.css";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import listMovieApi from "../../api/listMovieApi";
import { listSlice } from "../../redux/reducer/listSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
export default function NewListMovie() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies.movies);
  const listMovie = useSelector((state) => state.lists.list);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getMovies(dispatchMovie);
  // }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(list);
    e.preventDefault();
    try {
      const res = await listMovieApi.createListMovie(list);
      toast.success(res.data.message);
      navigate("/lists");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
