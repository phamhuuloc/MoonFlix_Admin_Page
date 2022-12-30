import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";


const initialState = {
  suppliers: [],
};

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    setSupplier: (state, action) => {
      state.suppliers = action.payload;
    },
  },
});

export default supplierSlice.reducer;
