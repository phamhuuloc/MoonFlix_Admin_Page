import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  movies: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload;
    },
  },
});
// dispatch(setUser(user))
// const user = userSelector(state => state.user)

// Action creators are generated for each case reducer function
export const { setMovie } = movieSlice.actions;

export default movieSlice.reducer;
