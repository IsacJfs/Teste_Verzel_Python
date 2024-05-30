import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseUrl } from '../../utils/BaseUrl'
import toast from 'react-hot-toast'
import qs from 'qs'

// Definindo os tipos para os parâmetros da função de login
interface LoginParams {
  username: string
  password: string
}

// Tipo para a resposta da API de login
interface LoginResponse {
  auth_token: string
}

// Thunk para a operação de login
export const loginThunk = createAsyncThunk<
  { username: string; token: string }, // Tipo de retorno em caso de sucesso
  LoginParams, // Tipo dos parâmetros da função de login
  { rejectValue: string } // Tipo de retorno em caso de erro
>('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const loginData = {
      grant_type: '',
      username,
      password,
      scope: '',
      client_id: '',
      client_secret: ''
    }
    const response = await axios.post<LoginResponse>(
      `${BaseUrl()}/auth/token/`, qs.stringify(loginData),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    localStorage.setItem('user', username)
    sessionStorage.setItem('access_token', response.data.auth_token)
    if (response.data.auth_token) {
      toast.success('Login realizado com sucesso!')
    }
    return { username, token: response.data.auth_token }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('Usuário ou senha inválidos!')
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Erro desconhecido ao fazer login')
  }
})

export const logoutThunk = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
      console.log('Thunk Logout executado')
      await axios.post(
        `${BaseUrl()}/auth/token/logout/`,
        {},
        {headers: {
          Authorization: `Token ${sessionStorage.getItem('auth_token')}`,
        }
      })

      sessionStorage.removeItem('user')
      sessionStorage.removeItem('auth_token')
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Falha ao fazer logout')
        toast.error((error.response.data.detail))
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Erro desconhecido ao fazer login')
    }
  }
)

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZUNpbmNvIiwic2NvcGVzIjpbXSwiZXhwIjoxNzE3MDc4NzE5fQ.6NbhjTloGGdp49YqLsRS4W7NxvCI5JRIZyevawG8VpQ
