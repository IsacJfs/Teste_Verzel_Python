import { useDispatch, useSelector } from 'react-redux'
import { onClose, onOpen, setLoginSuccess } from './loginSlice'
import { AppDispatch, RootState } from '../store'
import { loginThunk } from './postLoginThunk'

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.login.isOpen)
  const userData = useSelector((state: RootState) => state.login.userData)
  const loading = useSelector((state: RootState) => state.login.loading)
  const error = useSelector((state: RootState) => state.login.error)
  const loginSuccess = useSelector((state: RootState) => state.login.loginSuccess)

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())
  const handleLoginSuccess = () => {
    dispatch(setLoginSuccess(true))
  }

  const handleLogoutSuccess = () => {
    dispatch(setLoginSuccess(false))
  }

  const login = (username: string, password: string) => {
    dispatch(loginThunk({ username, password }))
  }

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    userData,
    loading,
    error,
    login,
    loginSuccess,
    handleLoginSuccess,
    handleLogoutSuccess
  }
}
