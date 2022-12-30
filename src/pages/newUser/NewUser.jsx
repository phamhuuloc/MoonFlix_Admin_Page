import "./newUser.css";
import { useState } from "react";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import {  useLocation } from "react-router-dom";

export default function NewUser() {
 
  

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profilePic ,setProfilePic]  = useState("");
  const [phone, setPhone] = useState(null);
  const [wallet_balance, setWallet_Balance] = useState(null);
  const [point, setPoint] = useState();
  // const [moneySpended ,setMoneySpended] = useState(0);
  // const [faceId , setFaceId] = useState("");
  // const [isAdmin , setIsAdmin] =   useState(false);


  const [userInfo, setUserInfo] = useState(null);
  console.log(profilePic)
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value ,profilePic: "https://pm1.narvii.com/6915/b750d3766167c6d41dfd8f55e45f72631d100409r1-320-320v2_hq.jpg"});
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await userApi.createNewUser(userInfo);
      toast.success(res.data.message);
      setUsername(null);
      setEmail(null);
      setPhone(null);
      setWallet_Balance(null);
      setPoint(null);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder=""
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="jony@gmail.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="0353339425"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Wallet Banance</label>
          <input
            type="number"
            placeholder="0"
            name="wallet_balance"
            value={wallet_balance}
            onChange={handleChange}
          />
        </div>
 
          {/* <div className="newUserItem">
                  <label>Type</label>
                  <select
                    name="isAdmin"
                    className="userUpdateInput"
                    onChange={handleChange}
                  >
                    <option value="false">isMember</option>
                    <option value="true">isAdmin</option>
                  </select>
          </div> */}
        
        <div className="newUserItem">
          <div className="newUserItem">
            <label>Point</label>
            <input
              type="number"
              placeholder="0"
              name="point"
              value={point}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="newUserButton" onClick={(e) => handleCreateUser(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
