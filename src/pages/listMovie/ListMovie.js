import "./listMovie.css";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listMovieApi from "../../api/listMovieApi";
import { listSlice } from "../../redux/reducer/listSlice";
export default function ListMovie() {
  // const [data, setData] = useState(productRows);

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.list);

  useEffect(() => {
    const getListMovie = async () => {
      try {
        const res = await listMovieApi.getListMovie();
        // setMovies(res.data.data);
        dispatch(listSlice.actions.setLists(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    getListMovie();
  }, []);
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newListMovie = lists.filter((movie) => movie._id !== id);
      dispatch(listSlice.actions.setLists(newListMovie));
      const res = await listMovieApi.deleteListMovie(id);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id }}
              state={{ list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
