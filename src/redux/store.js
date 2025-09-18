import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productAdminReducer from './productAdminSlice';
import personAdminReducer from './personAdminSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        productAdmin: productAdminReducer,
        personAdmin: personAdminReducer,
    }
});

export default store;