import { createSlice } from '@reduxjs/toolkit';
import {  VehicleResponse } from './types';
import { postVehicle } from './postThunk';


interface VehiclesState {
  vehicles: VehicleResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VehiclesState = {
  vehicles: [],
  isLoading: false,
  error: null,
};

export const createCarSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload;

      })
      .addCase(postVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default createCarSlice.reducer;
