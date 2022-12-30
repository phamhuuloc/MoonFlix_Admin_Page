import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { userSlice } from "../../redux/reducer/userSlice";
import { movieSlice } from "../../redux/reducer/movieSlice";
import movieApi from "../../api/movieApi";
export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.list.list);
  const users = useSelector((state) => state.users.arrayUsers);
  const movies = useSelector((state) => state.movies.movies);
  const [revenue ,setRevenue] = useState(0);
 
  useEffect(() => {
    const getInfoForAlalys = async () => {
      const resRevenue = await userApi.getSumRevenueOfMonth();
      const resListuser = await userApi.getUsersList();
      const resListMovie = await  movieApi.getMovies();
      setRevenue(resRevenue.data.data.revenue);
      dispatch(userSlice.actions.setUsers(resListuser.data.data));
      dispatch(movieSlice.actions.setMovie(resListMovie.data.data));
      
    };
    getInfoForAlalys();
  }, []);
  console.log(users)
  // const totalRevenue = users.reduce(
  //   (previous, current) => previous.money_spended + current.money_spended,
   
  // );

  // const total = Object.values(users).reduce(
  //   (t, { money_spended }) => (t + money_spended) / 1000000,
  //   0
  // );

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
          <span className="featuredMoney">{revenue} vnd</span>
          {/* <span className="featuredMoneyRate"> */}
          {/*   +2.4 <ArrowUpward className="featuredIcon" /> */}
          {/* </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
