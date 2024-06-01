import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, VehicleResponse } from './types';
import { createVehicle } from './postThunk';

interface VehiclesState {
  vehicles: {
    data: VehicleResponse;
    photoFile: File | null;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
};

export const createCarSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action: PayloadAction<Vehicle>) => {
        state.loading = false;
        // Create a VehicleResponse object from the Vehicle payload
        const vehicleResponse: VehicleResponse = {
          id: -1,             // Placeholder for id (you'll need to get this from your backend)
          user_name: 'user',  // Replace with the actual user name from your backend
          ...action.payload,
        };
        state.vehicles.push({
          data: vehicleResponse,
          photoFile: action.payload.photo ? new File([action.payload.photo], 'vehicle.jpg') : null
        });
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createCarSlice.reducer;
