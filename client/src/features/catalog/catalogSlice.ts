import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductParams } from "../../app/model/productParams";

const initialState: ProductParams = {
  orderBy: "name",
  searchTerm: "",
  types: [],
  brands: [],
  pageNumber: 1,
  pageSize: 8,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },
    setTypes(state, action: PayloadAction<string[]>) {
      state.types = action.payload;
      state.pageNumber = 1;
    },
    setBrands(state, action: PayloadAction<string[]>) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {
  setPageNumber,
  setPageSize,
  setOrderBy,
  setTypes,
  setBrands,
  setSearchTerm,
  resetParams,
} = catalogSlice.actions;

export default catalogSlice.reducer;
