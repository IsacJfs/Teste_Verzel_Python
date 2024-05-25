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
