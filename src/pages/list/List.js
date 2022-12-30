import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import listMovieApi from "../../api/listMovieApi";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline } from "@material-ui/icons";
import list_movie_api from "../../api/list_movie_api";
import {listMovieSlice} from "../../redux/reducer/listMovieSlice";
export default function List() {

  const location = useLocation();
  const list = location.state.list;
  const navigate = useNavigate();
 

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.listmovie.listmovie);

  console.log(movies)

  useEffect(() => {
    const getMovieOfList = async () => {
      try {
        const res = await list_movie_api.getAllMovieOflist(list.id)
        dispatch(listMovieSlice.actions.setListMovie(res.data.data))
      } catch (err) {
        console.log(err);
      }
    };
    getMovieOfList();
  }, []);

 
  
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(null);
  const [genre, setGenre] = useState(null);
  const [listMovie, setListMovie] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setListMovie({ ...listMovie, [e.target.name]: value });
  };

  const handleUpdatListMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await listMovieApi.updateListMovie(list.id, listMovie);
      toast.success(res.data.message);
      navigate("/lists");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newMovies = movies.filter((movie) => movie.id !== id);
      dispatch(listMovieSlice.actions.setListMovie(newMovies));
      const movieDeleted = {lm_list_id: list.id , lm_movie_id: id}
      console.log(movieDeleted)
      const res = await list_movie_api.deleteMovieOfList(movieDeleted);
 
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data);
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      width: 120,
    },

    {
      field: "genre",
      headerName: "Genre",
      width: 120,
    },

    {
      field: "year",
      headerName: "Year",
      width: 160,
    },
    {
      field: "isSeries",
      headerName: "IsSeries",
      width: 160,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/movie/" + params.row.id,
              }}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newListMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={list.title}
              name="title"
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              placeholder={list.type}
              name="type"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={list.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <button
              className="productButton"
              onClick={(e) => handleUpdatListMovie(e)}
            >
              Update
            </button>
          </div>
        </form>
        <div className="productList">
       
        </div>
  
      </div>
      <DataGrid
        rows={movies}
        disableSelectionOnClickND
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r.id}
      />
    </div>
    
  );
}
