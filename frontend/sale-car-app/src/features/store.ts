import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import loginReducer from "./auth/loginSlice";
import userRegisterReducer from "./register/userRegisterSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    login: loginReducer,
    userRegister: userRegisterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
