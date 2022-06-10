import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
export default function FeaturedInfo() {
  const lists = useSelector((state) => state.lists.list);
  const users = useSelector((state) => state.users.arrayUsers);
  const movies = useSelector((state) => state.movies.movies);
  const sumTotalRevenue = 0;
  console.log(users);
  const totalRevenue = users.reduce(
    (previous, current) => previous.money_spended + current.money_spended,
    sumTotalRevenue
  );

  const total = Object.values(users).reduce(
    (t, { money_spended }) => (t + money_spended) / 1000000,
    0
  );
  console.log(total);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.length}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Movies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{movies.length}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Totoal revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{total.toFixed(2)} Tr</span>
          {/* <span className="featuredMoneyRate"> */}
          {/*   +2.4 <ArrowUpward className="featuredIcon" /> */}
          {/* </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
