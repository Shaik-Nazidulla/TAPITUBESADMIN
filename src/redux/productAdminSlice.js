// src/features/admin/productAdminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "https://tapi-tubes-server.onrender.com";

// Helper to get auth header
const authHeader = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/product`, {
        headers: { ...authHeader(token) },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Fetch failed');
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/product/create`, {
        method: 'POST',
        headers: { ...authHeader(token) },
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Creation failed');
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ productId, formData }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/product/edit/${productId}`, {
        method: 'PUT',
        headers: { ...authHeader(token) },
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Update failed');
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  products: [],
  loadingProducts: false,
  productError: null,

  newProduct: null,
  creating: false,
  createError: null,

  updatedProduct: null,
  updating: false,
  updateError: null,
};

const productAdminSlice = createSlice({
  name: 'productAdmin',
  initialState,
  reducers: {
    clearAdminState(state) {
      state.newProduct = null;
      state.updatedProduct = null;
      state.createError = null;
      state.updateError = null;
      state.productError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
        state.productError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.productError = action.payload;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;
        state.newProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearAdminState } = productAdminSlice.actions;
export default productAdminSlice.reducer;

// Selectors
export const selectProductsAdmin = (state) => state.productAdmin.products;
export const selectLoadingProducts = (state) => state.productAdmin.loadingProducts;
export const selectProductError = (state) => state.productAdmin.productError;

export const selectNewProduct = (state) => state.productAdmin.newProduct;
export const selectCreatingProduct = (state) => state.productAdmin.creating;
export const selectCreateProductError = (state) => state.productAdmin.createError;

export const selectUpdatedProduct = (state) => state.productAdmin.updatedProduct;
export const selectUpdatingProduct = (state) => state.productAdmin.updating;
export const selectUpdateProductError = (state) => state.productAdmin.updateError;
