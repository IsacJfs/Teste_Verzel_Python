export interface Vehicle {
  car_model_id: number
  brand_id: number
  price: number
  year: number
  location: string
}

export interface VehicleResponse {
  car_model_id: number
  brand_id: number
  price: number
  year: number
  location: string
  id: number
  user_id: number
  images: []
}
export interface VehicleImage {
  image: File
}
export interface auth {
  access_token: string
}

export interface VehicleCreate {
  vehicleData: Vehicle
  authentication: auth
}
