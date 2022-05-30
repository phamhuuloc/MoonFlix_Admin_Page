import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  info: JSON.parse(localStorage.getItem("admin")) || null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.info = action.payload;
    },
  },
});
// dispatch(setUser(user))
// const user = userSelector(state => state.user)

// Action creators are generated for each case reducer function
export const { setUser } = adminSlice.actions;

export default adminSlice.reducer;
