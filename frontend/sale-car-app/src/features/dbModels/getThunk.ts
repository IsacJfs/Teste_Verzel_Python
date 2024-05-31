import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const postUrl = "http://localhost:8000/brands/";

export const fetchBrandsList = createAsyncThunk(
  'cars/fetchBrandsList',
  async () => {
    try {
      const response = await axios.get(postUrl);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
)

export const fetchModelsList = createAsyncThunk(
  'cars/fetchModelsList',
  async (modelId: number) => {
    try {
      const response = await axios.get(`${postUrl}${modelId}/models/`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
)
