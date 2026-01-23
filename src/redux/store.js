import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productAdminReducer from './productAdminSlice';
import personAdminReducer from './personAdminSlice';
import blogsReducer from './blogsSlice';
import aboutReducer from './aboutSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        productAdmin: productAdminReducer,
        personAdmin: personAdminReducer,
        blogs: blogsReducer,
        about: aboutReducer,
    }
});

export default store;