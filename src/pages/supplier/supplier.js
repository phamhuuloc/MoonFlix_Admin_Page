import { Link } from "react-router-dom";
import "./supplier.css";
import { useSelector, useDispatch } from "react-redux";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import supplierApi from "../../api/supplierApi";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import storage from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
export default function Supplier() {

    const location = useLocation();
    const supplier = location.state.supplier;

    
    const [sl_name,setSlName] = useState(null);
    const [sl_email, setSlEmail] = useState(null);
    const [sl_phone, setSlPhone] = useState(null);
    const [sl_address , setSlAddress] = useState(null);
    const [image , setImage] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [supplierInfo, setSupplierInfo] = useState(null);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const value = e.target.value;
        setSupplierInfo({ ...supplierInfo, [e.target.name]: value });
    };
    const removeSelectedImage = () => {
        setImage();
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };
    console.log(supplierInfo)

    const upload = (items) => {
        items.forEach((item) => {
            // const fileName = new Date().getTime() + item.label + item.file;
            const storageRef = ref(storage, `/supplier/${item.file.name}`);
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
                        setSupplierInfo((prev) => {
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
        upload([{ file: image, label: "image" }]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await supplierApi.updateSupplier(
                supplier.id,
                supplierInfo
            );
            console.log(res);
            toast.success(res.data.message);
            // navigate("/suppliers");
        } catch (err) {
            toast.error(err.response);
        }
    };
    console.log(supplierInfo);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">supplier</h1>
                <Link to="/newSupplier">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={supplier.image}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{supplier.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">
                                {supplier.id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Name</span>
                            <span className="productInfoValue">
                                {supplier.sl_name}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email </span>
                            <span className="productInfoValue">
                                {supplier.sl_email}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Phone </span>
                            <span className="productInfoValue">
                                {supplier.sl_phone}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Supplier Name</label>
                        <input
                            type="text"
                            placeholder={supplier.sl_name}
                            name="sl_name"
                            onChange={handleChange}
                        />
                        <label>Supplier Email</label>
                        <input
                            type="text"
                            placeholder={supplier.sl_email}
                            name="sl_email"
                            onChange={handleChange}
                        />
                        <label> Supplier Phone</label>
                        <input
                            type="text"
                            placeholder={supplier.sl_phone}
                            onChange={handleChange}
                            name="sl_phone"
                        />
                        <label>Supplier Adress</label>
                        <input
                            type="text"
                            placeholder={supplier.sl_address}
                            name="sl_address"
                            onChange={handleChange}
                        />
                      
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            {image ? (
                                <div>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Thumb"
                                        className="userUpdateImg"
                                    />
                                </div>
                            ) : (
                                <img
                                    className="userUpdateImg"
                                    src={supplier.image}
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
                                name="image"
                                onChange={imageChange}
                                // onChange={(e) => setProfilePic(e.target.files[0])}
                            />
                        </div>
                        {uploaded === 1 ? (
                            <button
                                className="addProductButton"
                                onClick={handleSubmit}
                            >
                                Update
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
