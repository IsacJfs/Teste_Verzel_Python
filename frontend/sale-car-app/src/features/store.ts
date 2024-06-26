import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import loginReducer from "./auth/loginSlice";
import brandsReducer from "./dbModels/brandSlice";
import modelReducer from "./dbModels/modelSlice";
import createCarReducer from "./cars/createCarSlice";
import userRegisterReducer from "./register/userRegisterSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    login: loginReducer,
    userRegister: userRegisterReducer,
    brands: brandsReducer,
    models: modelReducer,
    createCar: createCarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
