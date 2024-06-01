export interface CarsProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  photo: string;
  price: string;
  location: string;
}

export interface CarsState {
  cars: CarsProps[];
  isLoading: boolean;
  error: string | null
}

export interface Vehicle {
  name: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  location: string;
  photo: File;
}

export interface auth {
  token: string;
}

export interface VehicleCreate {
  brand: string;
  model: string;
  name: string;
  photo: File;
  price: number;
  year: number;
  location: string;
  description: string;
}

export interface VehicleResponse {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  location: string;
  photo: File;
  user_name: string;
}
