import "./widgetLg.css";
import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
export default function WidgetLg() {
  const initialFormData = {
    topUsersMonth: [],
    topUsersYear: [],
  };

  const [topUsers, setTopUsers] = useState(initialFormData);
  const [listCurrentTop, setListCurrentTop] = useState([]);
  const [showTopMonth, setShowTopMonth] = useState(true);

  useEffect(() => {
    const getListTopDonate = async () => {
      const res = await adminApi.getTopUser();
      setTopUsers({
        topUsersMonth: res.data.topUserMonth,
        topUsersYear: res.data.topUserYear,
      });

      setListCurrentTop(res.data.topUserMonth);
    };
    getListTopDonate();
  }, []);

  return (
    <div className="widgetLg">
      {/* <h3 className="widgetLgTitle">Top User</h3> */}
      <div className="widgetLgWrapper">
        <h3 className="widgetLgTitle">
          Top User {showTopMonth ? "Month" : "Year"}
        </h3>
        <div>
          <button
            onClick={() => {
              setListCurrentTop(topUsers.topUsersMonth);
              setShowTopMonth(true);
            }}
            className={
              showTopMonth ? "active widgetLgButton" : "widgetLgButton"
            }
          >
            List Of Month
          </button>
          <button
            onClick={() => {
              setListCurrentTop(topUsers.topUsersYear);
              setShowTopMonth(false);
            }}
            className={
              showTopMonth ? "widgetLgButton" : "active widgetLgButton"
            }
          >
            List Of Year
          </button>
        </div>
      </div>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Gmail</th>
            {/* <th className="widgetLgTh">Phone</th> */}
            <th className="widgetLgTh">Money Spended</th>
          </tr>
          {listCurrentTop.map((user) => {
            return (
              <tr className="widgetLgTr" key={user.id}>
                <td className="widgetLgUser">
                  <img src={user.profilePic} alt="" className="widgetLgImg" />
                  <span className="widgetLgName">{user.username}</span>
                </td>
                <td className="widgetLgDate">{user.email}</td>
                {/* <td className="widgetLgAmount">{user.phone}</td> */}
                <td className="widgetLgAmount">{user.money_spended}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
