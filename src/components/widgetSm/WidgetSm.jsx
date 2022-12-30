import "./widgetSm.css";
import { NewReleases, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { Link } from "react-router-dom";
import axios from "axios";
import movieApi from "../../api/movieApi";
export default function WidgetSm() {
  const [topMovie, setTopMovie] = useState([]);
  useEffect(() => {
    const getTopMovie = async () => {
      try {
        const res = await movieApi.getTopMovies();
        setTopMovie(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTopMovie();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Top 10 Movies</span>
      <ul className="widgetSmList">
        {topMovie.map((movie) => {
          return (
            <li className="widgetSmListItem" key={movie.id}>
              <img
                src={
                  movie.img ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUserTitle">Movie Name</span>
                <span className="widgetSmUsername">{movie.title}</span>
              </div>
              <div className="widgetSmUser">
                <span className="widgetSmUserTitle">{movie.create_at}</span>
              </div>

              <button className="widgetSmButton">
                <Link
                   to={{
                    pathname: "/movie/" + movie.id,
                  }}
                  state={{ movie: movie }}
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
