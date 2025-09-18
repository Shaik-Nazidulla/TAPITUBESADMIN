import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://tapi-tubes-server.onrender.com';

const authHeader = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

// Fetch all team members
export const fetchTeamMembers = createAsyncThunk(
  'admin/fetchTeamMembers',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;        // adjust path if different
    try {
      const response = await fetch(`${API_URL}/team`, {
        headers: authHeader(token),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Create team member
export const createTeamMember = createAsyncThunk(
  'admin/createTeamMember',
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/team/create`, {
        method: 'POST',
        headers: authHeader(token),
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update team member
export const updateTeamMember = createAsyncThunk(
  'admin/updateTeamMember',
  async ({ personId, formData }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/team/edit/${personId}`, {
        method: 'PUT',
        headers: authHeader(token),
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  teamMembers: [],
  loadingTeam: false,
  teamError: null,

  newMember: null,
  creating: false,
  createError: null,

  updatedMember: null,
  updating: false,
  updateError: null,
};

const personAdminSlice = createSlice({
  name: 'personAdmin',
  initialState,
  reducers: {
    clearPersonAdminState(state) {
      state.newMember = null;
      state.updatedMember = null;
      state.createError = null;
      state.updateError = null;
      state.teamError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch team members
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loadingTeam = true;
        state.teamError = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loadingTeam = false;
        state.teamMembers = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loadingTeam = false;
        state.teamError = action.payload;
      })

      // Create team member
      .addCase(createTeamMember.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createTeamMember.fulfilled, (state, action) => {
        state.creating = false;
        state.newMember = action.payload;
      })
      .addCase(createTeamMember.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Update team member
      .addCase(updateTeamMember.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.updating = false;
        state.updatedMember = action.payload;
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearPersonAdminState } = personAdminSlice.actions;
export default personAdminSlice.reducer;

// Selectors
export const selectTeamMembers = (state) => state.personAdmin.teamMembers;
export const selectLoadingTeam = (state) => state.personAdmin.loadingTeam;
export const selectTeamError = (state) => state.personAdmin.teamError;

export const selectNewMember = (state) => state.personAdmin.newMember;
export const selectCreating = (state) => state.personAdmin.creating;
export const selectCreateError = (state) => state.personAdmin.createError;

export const selectUpdatedMember = (state) => state.personAdmin.updatedMember;
export const selectUpdating = (state) => state.personAdmin.updating;
export const selectUpdateError = (state) => state.personAdmin.updateError;
