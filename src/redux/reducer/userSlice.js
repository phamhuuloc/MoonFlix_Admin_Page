import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  arrayUsers: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.arrayUsers = action.payload;
    },
  },
});
// dispatch(setUser(user))
// const user = userSelector(state => state.user)

// Action creators are generated for each case reducer function
export const { setMovie } = userSlice.actions;

export default userSlice.reducer;
