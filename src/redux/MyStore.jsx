import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice'

export const MyStore = configureStore({
    reducer : {
        auth : AuthReducer
    }
})