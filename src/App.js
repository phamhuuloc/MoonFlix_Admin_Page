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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjg1Ho0SnLMYAC8D3TN4oGbxCNTzt8wZ0",
  authDomain: "netflix-admin-70527.firebaseapp.com",
  projectId: "netflix-admin-70527",
  storageBucket: "netflix-admin-70527.appspot.com",
  messagingSenderId: "578489467671",
  appId: "1:578489467671:web:5e3e578b6562ef3977ed52",
  measurementId: "G-TDZPN87LD6",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDOl_u6ygeEJFsI4WwKIZAxeXucVYsnaCo",
//   authDomain: "admin-34b73.firebaseapp.com",
//   projectId: "admin-34b73",
//   storageBucket: "admin-34b73.appspot.com",
//   messagingSenderId: "15167484250",
//   appId: "1:15167484250:web:d584cd3bd4a87277580363",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
