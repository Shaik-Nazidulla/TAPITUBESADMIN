// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://tapi-tubes-server.onrender.com"; 

// ========== SIGNUP ==========
export const adminSignup = createAsyncThunk(
  "auth/adminSignup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data; // contains { data: { accessToken }, statusCode, success }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ========== LOGIN ==========
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ========== SLICE ==========
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // SIGNUP
    builder
      .addCase(adminSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.data.accessToken;
        localStorage.setItem("token", action.payload.data.accessToken);
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });

    // LOGIN
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.data.accessToken;
        localStorage.setItem("token", action.payload.data.accessToken);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
