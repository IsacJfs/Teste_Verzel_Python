export interface RegisterData {
  username: string,
  full_name: string,
  email: string,
  password: string
  disabled?: boolean
}

export interface RegisterResponse {
  token: string;
}
