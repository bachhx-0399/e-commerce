/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RatingOption } from "@/components/common/types/rating-option.type";

interface FilterParams {
  category: string;
  brand: string[];
  currentPage: number;
  rangeValues: number[];
  freeShipping: boolean;
  rating?: RatingOption;
  sortBy?: string;
  hitsPerPage?: number;
}

const initialState: FilterParams = {
  category: "",
  brand: [],
  currentPage: 1,
  rangeValues: [0, 5000],
  freeShipping: false,
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
      Object.assign(state, initialState);
      state.rating = undefined;
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
    setRangeValues: (state, action: PayloadAction<number[]>) => {
      state.rangeValues = action.payload;
    },
    setFreeShipping: (state, action: PayloadAction<boolean>) => {
      state.freeShipping = action.payload;
    },
    setRating: (state, action: PayloadAction<RatingOption>) => {
      state.rating = action.payload;
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
  setRangeValues,
  setFreeShipping,
  setRating,
} = filterParamsSlice.actions;

export default filterParamsSlice.reducer;
