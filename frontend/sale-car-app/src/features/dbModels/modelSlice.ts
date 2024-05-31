import { createSlice } from "@reduxjs/toolkit";
import { fetchModelsList } from "./getThunk";
import { ModelList } from "./types";

const initialState: ModelList = {
  Models: [],
  isLoading: false,
  error: null,
}

export const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModelsList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchModelsList.fulfilled, (state, action) => {
        state.Models = action.payload
        state.isLoading = false
      })
      .addCase(fetchModelsList.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
  }
})

export default modelSlice.reducer
