import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./reducer/adminSlice";
import moviesReducer from "./reducer/movieSlice";
import listReducer from "./reducer/listSlice";
import userReducer from "./reducer/userSlice";
import voucherReducer from "./reducer/voucherSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    users: userReducer,
    movies: moviesReducer,
    lists: listReducer,
    vouchers: voucherReducer,
  },
});
export default store;
