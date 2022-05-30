import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminSlice } from "../../redux/reducer/adminSlice";
import { toast } from "react-toastify";
import adminApi from "../../api/adminApi";
import "./login.scss";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await adminApi.login(data);
      console.log(res.data);
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("admin", JSON.stringify(res.data.data));
      dispatch(adminSlice.actions.setAdmin(res.data.data));
      toast.success("Login SuccessFully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Wrong password or eamail!");
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Enter your email or phone number"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter your password here"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="loginButton" onClick={(e) => handleLogin(e)}>
            <b>Sign In</b>
          </button>
          <span>
            Net to Netflix?
            <Link to="/register">
              <b> Sign Up Now</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn More</b>
          </small>
        </form>
      </div>
    </div>
  );
};
export default Login;
