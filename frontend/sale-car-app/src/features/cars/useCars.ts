import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback, useEffect, useState } from "react";
import { fetchCarsList } from "./getThunk";
import { VehicleCreate } from "./types";
import { createVehicle } from "./postThunk";


export const useCars = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cars = useSelector((state: RootState) => state.cars.cars)
  const {vehicles, loading, error} = useSelector((state: RootState) => state.createCar)
  const [success, setSuccess] = useState(false);

  const loadCars = useCallback(async () => {
    await dispatch(fetchCarsList())
  }, [dispatch])

  const handleCreateVehicle = async (vehicleData: VehicleCreate, token: string) => {
    try {
      await dispatch(createVehicle({vehicleData, token})).unwrap(); // Wait for the thunk to complete
      setSuccess(true);
    } catch (err) {
      // Handle error (display error message, etc.)
      console.error("Error creating vehicle:", err);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000); // Reset after 3 seconds
      return () => clearTimeout(timer); // Clear timer if component unmounts
    }
  }, [success]);

  return {
    cars,
    loadCars,
    vehicles,
    loading,
    error,
    handleCreateVehicle,
    success
  }
}
