import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsList } from "./getThunk";
import { CarsState } from "./Types"

const initialState: CarsState = {
  cars: [],
  isLoading: false,
  error: null
}

const carsSlice = createSlice({
  name: 'getCars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCarsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.cars = action.payload
      })
      .addCase(fetchCarsList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
  }
})

export default carsSlice.reducer
