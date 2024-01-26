import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "../features/shoeSlice";

const store = configureStore({
    reducer: {
        shoes: shoesReducer
    }
})
export default store