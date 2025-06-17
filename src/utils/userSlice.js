import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profile = action.payload.user; // Initialize profile with user data
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
