import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import listMovieApi from "../../api/listMovieApi";
export default function List() {
  const location = useLocation();
  const list = location.state.list;
  const navigate = useNavigate();

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
      console.log(list._id);
      const res = await listMovieApi.updateListMovie(list._id, listMovie);
      toast.success(res.data.message);
      navigate("/lists");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
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
              <span className="productInfoValue">{list._id}</span>
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
      </div>
    </div>
  );
}
