import "./widgetSm.css";
import { NewReleases, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(
          "https://sever-json-netflix.herokuapp.com/api/users/?new=true",
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODQ3NTQ0YWUzMTRlZGUwNTljMTRmOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mjg3NTc3MCwiZXhwIjoxNjUzMzA3NzcwfQ.53wQdT-V-FNB1hwkbaHFgxMCWGIfWm8tr6RF3yspekw",
            },
          }
        );
        setNewUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  console.log(newUsers.createAt);
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
                <span className="widgetSmUsername">{user.username}</span>
                {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
              </div>
              <div className="widgetSmUser">
                <span className="widgetSmUserTitle">{user.createAt}</span>
              </div>

              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
