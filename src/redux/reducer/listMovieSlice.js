import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";


const initialState = {
  listmovie: [],
};

export const listMovieSlice = createSlice({
  name: "listmovie",
  initialState,
  reducers: {
    setListMovie: (state, action) => {
      state.listmovie = action.payload;
    },
  },
});

export default listMovieSlice.reducer;
