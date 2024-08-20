/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { BrandsProps } from "@/components/body/sidebar/brands/brands.type";

interface BrandsState {
  brands: BrandsProps[];
  filteredBrands: BrandsProps[];
  limitedBrands: number;
}

const initialState: BrandsState = {
  brands: [],
  filteredBrands: [],
  limitedBrands: 5,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<BrandsProps[]>) {
      state.brands = action.payload;
    },
    setFilteredBrands(state, action: PayloadAction<BrandsProps[]>) {
      state.filteredBrands = action.payload;
    },
  },
});

export const { setBrands, setFilteredBrands } = brandsSlice.actions;

export default brandsSlice.reducer;
