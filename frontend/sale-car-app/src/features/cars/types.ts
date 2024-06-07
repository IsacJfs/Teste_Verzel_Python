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
  images: [{
    vehicle_id: number
    image_name: string
    image_ext: string
    image_content: string
    id: number
  }]
}

export interface VehicleState {
  vehicles: VehicleResponse[]
  isLoading: boolean
  error: string | null
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
