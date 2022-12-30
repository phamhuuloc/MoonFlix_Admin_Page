import "./movieList.css";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieSlice } from "../../redux/reducer/movieSlice";
import axios from "axios";
import movieApi from "../../api/movieApi";

export default function ProductList() {
  
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);


  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await movieApi.getMovies();
        dispatch(movieSlice.actions.setMovie(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newMovies = movies.filter((movie) => movie.id !== id);
      dispatch(movieSlice.actions.setMovie(newMovies));
      const res = await movieApi.deleteMovie(id);
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
    <div className="productList">
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
