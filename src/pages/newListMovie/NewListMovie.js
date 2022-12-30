import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import "./newListMovie.css";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import listMovieApi from "../../api/listMovieApi";
import { listSlice } from "../../redux/reducer/listSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import list_movie_api from "../../api/list_movie_api";
export default function NewListMovie() {

  const [list, setList] = useState(null);

  // const [lm_list_id ,setLmListId] = useState(null);
  // const [lm_movie_id, setLmMovieId] = useState(null);
  
  const [movieAdded, setMovieAdded] = useState(null);

  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies.movies);
  const listMovie = useSelector((state) => state.list.list);

  



  const dispatch = useDispatch();



  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = e.target.value
    setMovieAdded({ ...movieAdded, [e.target.name]: value });
  };



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await listMovieApi.createListMovie(list);
      toast.success(res.data.message);
      navigate("/lists");
    } catch (err) {
      toast.error(err.response.data);
    }
  }

 
  const handleAddMovie = async (e) => {

    e.preventDefault();
    try {
      const res = await list_movie_api.addMovieIntoList(movieAdded);
      toast.success(res.data.message);
      // navigate("/lists");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  console.log(movieAdded)
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
            <label>List</label>
            <select
            multiple
              name="lm_list_id"
           
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {listMovie.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Movies</label>
            <select
           multiple
              name="lm_movie_id"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div  className="addProductButtonContent">
        <button className="addProductButton" onClick={handleAddMovie}>
          Add Movie
        </button>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
        </div>
      
      </form>
    </div>
  );
}
