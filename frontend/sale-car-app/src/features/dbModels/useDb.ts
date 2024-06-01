import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback } from "react";
import { fetchBrandsList, fetchModelsList } from './getThunk';



export const useDb = () => {
  const dispatch = useDispatch<AppDispatch>()
  const brands = useSelector((state: RootState) => state.brands)
  const models = useSelector((state: RootState) => state.models)

  const loadBrands = useCallback(async () => {
    await dispatch(fetchBrandsList())
  }, [dispatch])

  const loadModels = useCallback(async (idmarca: number) => {
    await dispatch(fetchModelsList(idmarca))
  }, [dispatch])

  return {
    brands,
    models,
    loadBrands,
    loadModels
  }
}
