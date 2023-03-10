import { useContext, useState } from "react";
import { toast } from "react-toastify";
import movieApi from "../../api/movieApi";
import storage from "../../firebase";
import "./newMovie.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// Create a root reference

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [supplieries_id, setSupplierId] = useState(null);
  const [_desc , setDesc] = useState(null);
  const [img ,setImg] = useState(null);
  const [imgSm ,setImgSm] = useState(null);
  const [trailer,setStrailer] = useState(null);
  const [video ,setVideo] = useState(null);
  const [year , setYear] = useState(null);
  const [_limit,setLimt] =  useState(null);
  const [price ,setPrice] = useState(null);
  const [clicked,setClicked] = useState(null);
  const [isSeries, setSeries] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value ,supplier_id: 1 , clicked:0, isSeries: false});
  };

  const upload = (items) => {
    items.forEach((item) => {
      // const fileName = new Date().getTime() + item.label + item.file;
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
            setMovie((prev) => {
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
      { file: imgSm, label: "imgSm" },
      { file: video, label: "video" },
    ]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await movieApi.createMovie(movie);
      toast.success(res.data.message);
      setMovie(null);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        {/* <div className="addProductItem"> */}
        {/*   <label>Title image</label> */}
        {/*   <input */}
        {/*     type="file" */}
        {/*     id="imgTitle" */}
        {/*     name="imgTitle" */}
        {/*     onChange={(e) => setImgTitle(e.target.files[0])} */}
        {/*   /> */}
        {/* </div> */}
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="_desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div> */}
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="Duration"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="_limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Link Trailer</label>
          <input
            type="text"
            placeholder="trailer"
            name="trailer"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 3 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
