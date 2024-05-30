import { useDispatch, useSelector } from 'react-redux'
import { onOpen, onClose } from '../../features/register/userRegisterSlice'
import { AppDispatch, RootState } from '@/features/store'
import { registerUserThunk } from './postRegisterThunk'
import { RegisterData } from './types'

export const useUserRegister = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.userRegister.isOpen)
  const isLoading = useSelector((state: RootState) => state.userRegister.isLoading);
  const error = useSelector((state: RootState) => state.userRegister.error);
  const registerSuccess = useSelector((state: RootState) => state.userRegister.registerSuccess);

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())

  const register = async (userData: RegisterData) => {
    const response = await dispatch(registerUserThunk(userData));
    return response
  };

  return { isOpen, onOpen: handleOpen, onClose: handleClose, isLoading, error, register, registerSuccess }
}
