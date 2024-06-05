import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback, useEffect, useState } from "react";
import { fetchCarsList } from "./getThunk";
import { VehicleCreate } from "./types";
import { postVehicle } from "./postThunk";


export const useCars = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cars = useSelector((state: RootState) => state.cars.cars)
  const {vehicles, isLoading, error} = useSelector((state: RootState) => state.createCar)
  const [success, setSuccess] = useState(false);

  const loadCars = useCallback(async () => {
    await dispatch(fetchCarsList())
  }, [dispatch])

  const handleCreateVehicle = async (createVehicle: VehicleCreate) => {
    try {
      await dispatch(postVehicle(createVehicle)); // Wait for the thunk to complete
      setSuccess(true);
    } catch (err) {
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
    isLoading,
    error,
    handleCreateVehicle,
    success
  }
}
