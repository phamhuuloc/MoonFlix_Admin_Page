import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./newSupplier.css";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import supplierApi from "../../api/supplierApi";
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

export default function NewSupplier() {
  const [sl_name,setSlName] = useState(null);
  const [sl_email, setSlEmail] = useState(null);
  const [sl_phone, setSlPhone] = useState(null);
  const [sl_address , setSlAddress] = useState(null);
  const [image , setImage] = useState(null);
 
  const [supplier, setsupplier] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setsupplier({ ...supplier, [e.target.name]: value });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const upload = (items) => {
    items.forEach((item) => {
      // const fileName = new Date().getTime() + item.label + item.file;
      const storageRef = ref(storage, `/suppliers/${item.file.name}`);
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
            setsupplier((prev) => {
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
      const res = await supplierApi.createSupplier(supplier);
      console.log(res);
      toast.success(res.data.message);
      navigate("/suppliers");
    } catch (err) {
      toast.error(err.response);
    }
  };
  console.log(supplier);
  return (
    <div className="supplierCreate">
      <span className="supplierCreateTitle">Create New supplier</span>
      <form className="supplierCreateForm">
        <div className="supplierCreateLeft">
          <div className="supplierCreateItem">
            <label>Supplier Name</label>
            <input
              type="text"
              placeholder="annabeck99"
              name="sl_name"
              onChange={handleChange}
              className="supplierCreateInput"
            />
          </div>
          <div className="supplierCreateItem">
            <label>Supplier Email </label>
            <input
              type="text"
              placeholder="annabeck99"
              name="sl_email"
              onChange={handleChange}
              className="supplierCreateInput"
            />
          </div>
          <div className="userUpdateItem">
            <label>Supplier Phone</label>
            <input
              type="text"
              name="sl_phone"
              onChange={handleChange}
              placeholder="Netflix"
              className="supplierCreateInput"
            />
          </div>
          <div className="supplierCreateItem">
            <label>Supplier Address</label>
            <input
              type="text"
              name="sl_address"
              onChange={handleChange}
              placeholder="The best last for one "
              className="userUpdateInput"
            />
          </div>
      
        </div>
        <div className="supplierCreateRight">
          <div className="supplierCreateUpload">
            {image ? (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Thumb"
                  className="supplierCreateImg"
                />
              </div>
            ) : (
              <img
                className="supplierCreateImg"
                src="https://steamykitchen.com/wp-content/uploads/2021/04/43fc8a7c-4e07-41ca-9c60-023ef2afec2c.png"
                alt=""
              />
            )}
            <label htmlFor="file">
              <Publish className="supplierCreateIcon" />
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
