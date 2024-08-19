/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FilterParams {
  category: string;
  brand: string[];
}

const initialState: FilterParams = {
  category: "",
  brand: [],
};

const filterParamsSlice = createSlice({
  name: "filterParams",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<FilterParams>) => {
      state.category = action.payload.category;
      state.brand = action.payload.brand;
    },
    resetParams: (state) => {
      state.category = "";
      state.brand = [];
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setBrand: (state, action: PayloadAction<string[]>) => {
      state.brand = action.payload;
    },
  },
});

export const { setParams, resetParams, setCategory, setBrand } =
  filterParamsSlice.actions;

export default filterParamsSlice.reducer;
