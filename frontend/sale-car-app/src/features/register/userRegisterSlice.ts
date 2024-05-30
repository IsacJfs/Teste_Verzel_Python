import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk } from './postRegisterThunk'

interface RegisterState {
  isOpen: boolean
  isLoading: boolean
  error: string | null
  registerSuccess: boolean
}

const initialState: RegisterState = {
  isOpen: false,
  isLoading: false,
  error: null,
  registerSuccess: false
}

const registerModalSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {
    // Ações para abrir e fechar o modal. O state é o estado atual do slice.
    onOpen: (state) => {
      state.isOpen = true
    },
    onClose: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.registerSuccess = false
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false
        state.registerSuccess = true
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.registerSuccess = false
      })
  }
})

export const { onOpen, onClose } = registerModalSlice.actions

export default registerModalSlice.reducer
