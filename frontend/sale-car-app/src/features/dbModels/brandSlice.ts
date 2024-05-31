import { createSlice } from "@reduxjs/toolkit";
import { fetchBrandsList } from "./getThunk";
import { BrandList } from "./types";
const initialState: BrandList = {
    Brands: [],
    isLoading: false,
    error: null
}

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBrandsList.fulfilled, (state, action) => {
        state.Brands = action.payload
        state.isLoading = false
      })
      .addCase(fetchBrandsList.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
  }
})

export default brandSlice.reducer
