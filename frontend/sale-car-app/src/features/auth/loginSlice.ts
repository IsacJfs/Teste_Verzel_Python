import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from './postLoginThunk'

interface UserState {
  isOpen: boolean
  userData: { username: string; token: string } | null
  loading: boolean
  error: string | null
  loginSuccess: boolean
}

const initialState: UserState = {
  isOpen: false,
  userData: null,
  loading: false,
  error: null,
  loginSuccess: false
}

const loginSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true
    },
    onClose: (state) => {
      state.isOpen = false
    },
    setLoginSuccess: (state, action: PayloadAction<boolean>) => {
      state.loginSuccess = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.loginSuccess = false
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ username: string; token: string }>) => {
          state.userData = action.payload
          state.loading = false
          state.loginSuccess = true
        }
      )
      .addCase(
        loginThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ocorreu um erro desconhecido'
          state.loading = false
          state.loginSuccess = false
        }
      )
  }
})

export const { onOpen, onClose, setLoginSuccess } = loginSlice.actions

export default loginSlice.reducer
