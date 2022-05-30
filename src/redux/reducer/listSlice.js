import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  list: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.list = action.payload;
    },
  },
});
// dispatch(setUser(user))
// const user = userSelector(state => state.user)

// Action creators are generated for each case reducer function
export const { setLists } = listSlice.actions;

export default listSlice.reducer;
