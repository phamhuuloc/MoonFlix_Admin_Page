import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./reducer/adminSlice";
import moviesReducer from "./reducer/movieSlice";
import listReducer from "./reducer/listSlice";
import userReducer from "./reducer/userSlice";
import voucherReducer from "./reducer/voucherSlice";
import supplierReducer from "./reducer/supplierSlice";
import  listMovieReducer from "./reducer/listMovieSlice"
const store = configureStore({
  reducer: {
    admin: adminReducer,
    users: userReducer,
    movies: moviesReducer,
    list: listReducer,
    vouchers: voucherReducer,
    listmovie:  listMovieReducer,
    suppliers : supplierReducer
  },
});
export default store;
