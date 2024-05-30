export interface RegisterData {
  username: string,
  full_name: string,
  email: string,
  password: string
}

export interface RegisterResponse {
  token: string;
}
