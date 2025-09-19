import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productAdminReducer from './productAdminSlice';
import personAdminReducer from './personAdminSlice';
import blogsReducer from './blogsSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        productAdmin: productAdminReducer,
        personAdmin: personAdminReducer,
        blogs: blogsReducer,
    }
});

export default store;