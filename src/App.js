import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import ListMovie from "./pages/listMovie/ListMovie";
import List from "./pages/list/List";
import NewListMovie from "./pages/newListMovie/NewListMovie";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import VoucherList from "./pages/listVoucher/ListVoucher";
import NewVouchers from "./pages/newVoucher/NewVoucher";
import Voucher from "./pages/voucher/Voucher";

import { Slide, ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const admin = useSelector((state) => state.admin.info);
  return (
    <Router>
      {admin ? <Topbar /> : <div></div>}
      <div className="container">
        {admin ? <Sidebar /> : <div></div>}
        <Routes>
          <Route path="/" element={admin ? <Home /> : <Login />} />
          <Route path="/login" element={!admin ? <Login /> : <Home />} />
          {admin && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />

              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/newMovies" element={<NewMovie />} />

              <Route path="/lists" element={<ListMovie />} />
              <Route path="/list/:listId" element={<List />} />
              <Route path="/newListMovie" element={<NewListMovie />} />

              <Route path="/vouchers" element={<VoucherList />} />
              <Route path="/newVouchers" element={<NewVouchers />} />
              <Route path="/vouchers/:id" element={<Voucher />} />
            </>
          )}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </Router>
  );
}

export default App;
