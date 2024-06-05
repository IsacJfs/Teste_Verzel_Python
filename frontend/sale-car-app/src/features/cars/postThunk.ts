import axios from 'axios';
import {  VehicleCreate } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:8000';

export const postVehicle = createAsyncThunk(
  'cars/postVehicle',
  async ({ vehicleData, authentication }: VehicleCreate, { rejectWithValue }) => {
    console.log({ vehicleData, authentication });
    try {
      const response = await axios.post(`${API_URL}/vehicles/`, vehicleData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authentication}`,
        },
      });
      toast.success('Veículo criado com sucesso!');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Erro ao criar postagem!')
        return rejectWithValue(
          error.response?.data?.message || 'Erro ao criar postagem.'
        )
      }
      toast.error('Erro desconhecido ao criar postagem!')
      return rejectWithValue('Erro desconhecido ao criar postagem.')
    }
  }
)
