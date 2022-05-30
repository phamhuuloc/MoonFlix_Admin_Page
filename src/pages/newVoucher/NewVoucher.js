import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./newVoucher.css";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import voucherApi from "../../api/voucherApi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  AccountBalanceWallet,
  Loyalty,
} from "@material-ui/icons";

export default function NewVouchers() {
  const [image, setImage] = useState(null);
  const [point_cost, setPoint_Cost] = useState(null);
  const [supplier_name, setSupplier_name] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount_voucher_code, setAmout_Voucher_Code] = useState(null);
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setVoucher({ ...voucher, [e.target.name]: value });
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
            setVoucher((prev) => {
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
      const res = await voucherApi.createVoucher(voucher);
      console.log(res);
      toast.success(res.data.message);
      navigate("/vouchers");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  console.log(voucher);
  return (
    <div className="voucherCreate">
      <span className="voucherCreateTitle">Create New Voucher</span>
      <form className="voucherCreateForm">
        <div className="voucherCreateLeft">
          <div className="voucherCreateItem">
            <label>Point Cost</label>
            <input
              type="text"
              placeholder="annabeck99"
              name="point_cost"
              onChange={handleChange}
              className="voucherCreateInput"
            />
          </div>
          <div className="userUpdateItem">
            <label>Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              onChange={handleChange}
              placeholder="Netflix"
              className="voucherCreateInput"
            />
          </div>
          <div className="voucherCreateItem">
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="The best last for one "
              className="userUpdateInput"
            />
          </div>
          <div className="voucherCreateItem">
            <label>Amount Of Voucher Code </label>
            <input
              type="number"
              name="amount_voucher_code"
              onChange={handleChange}
              placeholder="1"
              className="userUpdateInput"
            />
          </div>
        </div>
        <div className="voucherCreateRight">
          <div className="voucherCreateUpload">
            {image ? (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Thumb"
                  className="voucherCreateImg"
                />
              </div>
            ) : (
              <img
                className="voucherCreateImg"
                src="https://steamykitchen.com/wp-content/uploads/2021/04/43fc8a7c-4e07-41ca-9c60-023ef2afec2c.png"
                alt=""
              />
            )}
            <label htmlFor="file">
              <Publish className="voucherCreateIcon" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              name="img"
              onChange={imageChange}
            />
          </div>
          {uploaded === 1 ? (
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          ) : (
            <button className="addProductButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
