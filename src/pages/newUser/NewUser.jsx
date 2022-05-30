import "./newUser.css";
import { useState } from "react";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";

export default function NewUser() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [wallet_balance, setWallet_Balance] = useState(null);
  const [point, setPoint] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value });
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
