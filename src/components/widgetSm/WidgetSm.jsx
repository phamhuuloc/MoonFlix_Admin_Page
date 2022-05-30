import "./widgetSm.css";
import { NewReleases, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { Link } from "react-router-dom";
import axios from "axios";
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await userApi.getNewUsers();
        setNewUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  console.log(newUsers);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => {
          return (
            <li className="widgetSmListItem">
              <img
                src={
                  user.profilePic ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUserTitle">User Name</span>
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <div className="widgetSmUser">
                <span className="widgetSmUserTitle">{user.createAt}</span>
              </div>

              <button className="widgetSmButton">
                <Link
                  to={{ pathname: "/users/" + user._id }}
                  state={{ user: user }}
                >
                  <Visibility className="widgetSmIcon" />
                  Display
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
