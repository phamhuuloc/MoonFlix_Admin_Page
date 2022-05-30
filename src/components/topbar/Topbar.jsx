import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { ArrowDropDown } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { adminSlice } from "../../redux/reducer/adminSlice";

export default function Topbar() {
  const admin = useSelector((state) => state.admin.info);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("admin");
    dispatch(adminSlice.actions.setAdmin(null));
    navigate("/login");

    // dispatch(adminSlice.actions.setAdmin(""));
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            Admin: <b>{!admin ? "" : admin.username}</b>
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <img
            src={admin ? admin.profilePic : ""}
            alt=""
            className="topAvatar"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <ul className="options">
              <li className="option-item">Setting</li>
              <li className="option-item" onClick={() => handleLogout()}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
