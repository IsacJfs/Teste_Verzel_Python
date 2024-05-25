import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback } from "react";
import { fetchCarsList } from "./getThunk";


export const useCars = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cars = useSelector((state: RootState) => state.cars.cars)

  const loadCars = useCallback(async () => {
    await dispatch(fetchCarsList())
  }, [dispatch])

  return {
    cars,
    loadCars
  }
}
