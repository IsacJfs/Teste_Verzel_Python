import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const postUrl = "http://localhost:8000/vehicles/";

export const fetchCarsList = createAsyncThunk(
  'cars/fetchCarsList',
  async () => {
    try {
      const response = await axios.get(postUrl);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
)
