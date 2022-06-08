import { Link } from "react-router-dom";
import "./movie.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import storage from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import movieApi from "../../api/movieApi";
export default function Movie() {
    const location = useLocation();
    const movie = location.state.movie;

    // const [title, setTitle] = useState(null);
    // const [year, setYear] = useState(null);
    // const [genre, setGenre] = useState(null);
    // const [limit, setLimit] = useState(null);
    const [img, setImg] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const [movieInfo, setMovieInfo] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setMovieInfo({ ...movieInfo, [e.target.name]: value });
    };
    const removeSelectedImage = () => {
        setImg();
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    };

    const upload = (items) => {
        items.forEach((item) => {
            const storageRef = ref(storage, `/items/${item.file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovieInfo((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: "img" },
            { file: video, label: "video" },
        ]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await movieApi.updateMovie(movie._id, movieInfo);
            toast.success(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(movieInfo);
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newMovies">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={movie.img}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">
                                {movie._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">
                                {movie.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">
                                {movie.year}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">
                                {movie.limit}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Price:</span>
                            <span className="productInfoValue">
                                {movie.price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input
                            type="text"
                            placeholder={movie.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Year</label>
                        <input
                            type="text"
                            placeholder={movie.year}
                            name="year"
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder={movie.genre}
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>Limit</label>
                        <input
                            type="text"
                            placeholder={movie.limit}
                            name="limit"
                            onChange={handleChange}
                        />
                        <label>Trailer</label>
                        <input
                            type="text"
                            placeholder={movie.trailer}
                            name="trailer"
                            onChange={handleChange}
                        />

                        <label>Video</label>
                        <input
                            type="file"
                            placeholder={movie.video}
                            name="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            {img ? (
                                <div>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt="Thumb"
                                        className="userUpdateImg"
                                    />
                                </div>
                            ) : (
                                <img
                                    className="userUpdateImg"
                                    src={movie.img}
                                    alt=""
                                />
                            )}
                            <label htmlFor="file">
                                <Publish className="userUpdateIcon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                name="img"
                                onChange={imageChange}
                                // onChange={(e) => setProfilePic(e.target.files[0])}
                            />
                        </div>
                        {uploaded === 2 ? (
                            <button
                                className="addProductButton"
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                        ) : (
                            <button
                                className="addProductButton"
                                onClick={handleUpload}
                            >
                                Upload
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
