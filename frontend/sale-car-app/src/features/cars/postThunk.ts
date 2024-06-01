import axios from 'axios';
import { Vehicle } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8000';

export const createVehicle = createAsyncThunk<Vehicle, { vehicleData: Vehicle; token: string }, { rejectValue: string }>(
  'cars/createVehicle',
  async ({token, vehicleData}, { rejectWithValue }) => {

  const formData = new FormData();

  // Iterate and append data with type checking
  for (const [key, value] of Object.entries(vehicleData)) {
    if (key === 'photo') {
      // Handle File object
      if (value instanceof File) {
        formData.append('photo', value);
      } else {
        console.error('Photo should be a File object.');
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      // Handle string or number
      formData.append(key, String(value)); // Convert numbers to strings
    } else {
      console.warn(`Skipping unsupported type for key '${key}':`, typeof value);
    }
  }
  console.log(formData);
  console.log(token);
  try {
    const response = await axios.post<Vehicle>(`${API_URL}/create-vehicle/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Erro ao criar veículo');
  }
}
)

