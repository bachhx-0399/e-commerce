/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FilterParams {
  category: string;
  brand: string[];
  currentPage: number;
  sortBy?: string;
  hitsPerPage?: number;
}

const initialState: FilterParams = {
  category: "",
  brand: [],
  currentPage: 1,
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
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setHitsPerPage: (state, action: PayloadAction<number>) => {
      state.hitsPerPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setParams,
  resetParams,
  setCategory,
  setBrand,
  setSortBy,
  setHitsPerPage,
  setCurrentPage,
} = filterParamsSlice.actions;

export default filterParamsSlice.reducer;
