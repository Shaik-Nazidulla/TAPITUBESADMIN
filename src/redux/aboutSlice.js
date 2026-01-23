// redux/slices/aboutSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aboutAPI } from '../services/api.js';

// Initial state
const initialState = {
  aboutData: null,
  loading: false,
  error: null,
  success: false,
};

// Async Thunks
export const fetchAboutUs = createAsyncThunk(
  'about/fetchAboutUs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aboutAPI.getAboutUs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch About Us data');
    }
  }
);

export const createAboutUs = createAsyncThunk(
  'about/createAboutUs',
  async (aboutData, { rejectWithValue }) => {
    try {
      const response = await aboutAPI.createAboutUs(aboutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create About Us data');
    }
  }
);

export const updateAboutUs = createAsyncThunk(
  'about/updateAboutUs',
  async (aboutData, { rejectWithValue }) => {
    try {
      const response = await aboutAPI.updateAboutUs(aboutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update About Us data');
    }
  }
);

export const deleteAboutUs = createAsyncThunk(
  'about/deleteAboutUs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aboutAPI.deleteAboutUs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete About Us data');
    }
  }
);

// Create slice
const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetAboutState: (state) => {
      state.aboutData = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch About Us
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
        state.error = null;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create About Us
    builder
      .addCase(createAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Update About Us
    builder
      .addCase(updateAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Delete About Us
    builder
      .addCase(deleteAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAboutUs.fulfilled, (state) => {
        state.loading = false;
        state.aboutData = null;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export actions
export const { clearError, clearSuccess, resetAboutState } = aboutSlice.actions;

// Export reducer
export default aboutSlice.reducer;
