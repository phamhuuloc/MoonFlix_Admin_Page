import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  PlayCircleOutline,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Settings,
  SellOutlined,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminSlice } from "../../redux/reducer/adminSlice";

export default function Sidebar() {
  const admin = useSelector((state) => state.admin.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("admin");
    dispatch(adminSlice.actions.setAdmin(null));
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/vouchers" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Voucher
              </li>
            </Link>

            <Link to="/newMovies" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Add Movie
              </li>
            </Link>
            <Link to="/newListMovie" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Add List
              </li>
            </Link>
            <Link to="/newVouchers" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Add Voucher
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            {/* <li className="sidebarListItem"> */}
            {/*   <DynamicFeed className="sidebarIcon" /> */}
            {/*   Feedback */}
            {/* </li> */}
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              <Link
                to={{ pathname: "/users/" + admin._id }}
                state={{ user: admin }}
              >
                Admin Info
              </Link>
            </li>
            {/* <li className="sidebarListItem"> */}
            {/*   <Timeline className="sidebarIcon" /> */}
            {/*   Analytics */}
            {/* </li> */}
            <li className="sidebarListItem" onClick={() => handleLogout()}>
              <Report className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
