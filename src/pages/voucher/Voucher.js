import { Link } from "react-router-dom";
import "./voucher.css";
import { useSelector, useDispatch } from "react-redux";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import voucherApi from "../../api/voucherApi";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import storage from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
export default function Voucher() {
    const location = useLocation();
    const voucher = location.state.voucher;

    const [image, setImage] = useState(null);
    const [point_cost, setPoint_Cost] = useState(null);
    const [supplier_name, setSupplier_name] = useState(null);
    const [description, setDescription] = useState(null);
    const [amount_voucher_code, setAmout_Voucher_Code] = useState(null);

    const [voucherInfo, setVoucherInfo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const dispatch = useDispatch();

    const [movieInfo, setMovieInfo] = useState(null);

    const handleChange = (e) => {
        const value = e.target.name;
        setMovieInfo({ ...movieInfo, [e.target.name]: value });
    };
    const removeSelectedImage = () => {
        setImage();
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const upload = (items) => {
        items.forEach((item) => {
            // const fileName = new Date().getTime() + item.label + item.file;
            const storageRef = ref(storage, `/vouchers/${item.file.name}`);
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
                        setVoucherInfo((prev) => {
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
            const res = await voucherApi.updateVoucher(
                voucher._id,
                voucherInfo
            );
            console.log(res);
            toast.success(res.data.message);
            // navigate("/vouchers");
        } catch (err) {
            toast.error(err.response.data);
        }
    };
    console.log(voucher);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Voucher</h1>
                <Link to="/newMovies">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={voucher.image}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{voucher.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">
                                {voucher._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Point Cost:</span>
                            <span className="productInfoValue">
                                {voucher.point_cost}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Create At:</span>
                            <span className="productInfoValue">
                                {voucher.createdAt.slice(0, 10)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Point Cost</label>
                        <input
                            type="text"
                            placeholder={voucher.point_cost}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Supplier Name</label>
                        <input
                            type="text"
                            placeholder={voucher.supplier_name}
                            name="year"
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder={voucher.description}
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>Amount Of Voucher Code</label>
                        <input
                            type="text"
                            placeholder={voucher.amount_voucher_code}
                            name="limit"
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
                                    src={voucher.image}
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
                                name="profilePic"
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
