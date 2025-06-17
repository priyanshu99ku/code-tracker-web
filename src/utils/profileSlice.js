import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './constants';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/${email}`);
      return response.data.data; // Return the data object directly
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
