import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  vouchers: [],
};

export const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    setVoucher: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

export default voucherSlice.reducer;
