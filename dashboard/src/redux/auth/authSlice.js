import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const SIGNUP_ENDPOINT = 'http://localhost:8800/api/auth/register';
export const LOGIN_ENDPOINT = 'http://localhost:8800/api/auth/login';
export const LOGOUT_ENDPOINT = 'http://localhost:8800/api/auth/logout';

const initialState = {
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  admin: {
      user: null,
      token: null,
  },
  error: {},
  message: "",
};

const authenticateBodyConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticateUser = createAsyncThunk(
  'redux/auth/login',
  async (payload, { rejectWithValue }) => {
    const data = payload.form;
    const config = authenticateBodyConfig();
    try {
      const response = await axios
        .post(payload.url, data, config);
        localStorage.setItem('admin_data', JSON.stringify(response.data));
       return response.data;

    } catch (err) {
      return rejectWithValue({ ...err.response.data });
    }
  },
);

export const logout = createAsyncThunk(
  'redux/auth/logout',
  async (payload, { rejectWithValue }) => {
    const config = authenticateBodyConfig();
    try {
      const response = await axios
        .get(payload.url, config);
        localStorage.clear();
       return response.data;

    } catch (err) {
      return rejectWithValue({ ...err.response.data });
    }
  },
);

const authSLicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateToken: (state, payload) => ({
      ...state,
      isAuthenticated: true,
      admin: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
    .addCase(authenticateUser.pending, (state) => ({
      ...state, 
      loading: true, 
      error: {}
    }))
    .addCase(authenticateUser.fulfilled, (state, action) => (
      {
        ...state,
        loading: false,
        isAuthenticated: true,
        isAdmin: action.payload.user.isAdmin,
        admin: action.payload,
        error: {},
      }))
    .addCase(authenticateUser.rejected, (state, action) => ({
      ...state, 
      loading: false, 
      isAuthenticated: false, 
      error: { ...action.payload },
    }))
    .addCase(logout.pending, (state) => ({
      ...state, 
      loading: true, 
      error: {}
    }))
    .addCase(logout.fulfilled, (state) => (
      {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
        error: {},
      }))
    .addCase(logout.rejected, (state, action) => ({
      ...state, 
      loading: false, 
      isAuthenticated: false, 
      error: { ...action.payload },
    }))
  },
});

export const { authenticateToken } = authSLicer.actions;
export default authSLicer.reducer;
