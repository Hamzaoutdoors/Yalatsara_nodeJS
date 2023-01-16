import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_API_ENDPOINT = 'http://localhost:8800/api/users';
const NEW_USER_API_ENDPOINT = 'http://localhost:8800/api/auth/register';

const initialState = {
  loading: false,
  data: [],
  userDetails: {},
  searchedusers: [],
  countByCity: [],
  error: {},
  message: {},
};

const jsonTypeConfig = (token) => {
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
  }

  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const getAllUsers = createAsyncThunk(
  'redux/users/getAllUsers.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const response = await axios.get(
        USERS_API_ENDPOINT,
        config,
      );
      return response.data.users;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const filterDeleted = (data, id) => data.filter((user) => user._id !== id);

export const deleteUser = createAsyncThunk(
  'redux/users/deleteUser.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const response = await axios.delete(
        `${USERS_API_ENDPOINT}/${payload}`,
        config,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

export const addUser = createAsyncThunk(
  'redux/users/addUser.js',
  async (payload, { rejectWithValue }) => {
    const config = jsonTypeConfig(false);
    try {
      const response = await axios.post(
        NEW_USER_API_ENDPOINT,
        payload,
        config,
      );
      console.log(response);
      return response.data.user;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

/* export const getuser = createAsyncThunk(
  'redux/users/getuser.js',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${user_API_ENDPOINT}/find/${payload}`,
        jsonTypeConfig(false),
      );
      return response.data.user;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

/* export const getCountByCity = createAsyncThunk(
  'redux/users/countByCity.js',
  async (payload, { rejectWithValue }) => {
    const citiesToString = payload.toString();
    try {
      const response = await axios.get(
        `${user_API_ENDPOINT}/countByCity?cities=${citiesToString}`,
        jsonTypeConfig(false),
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

/* export const searchByQuery = createAsyncThunk(
  'redux/users/search.js',
  async (payload, { rejectWithValue }) => {
    const {destination, min, max} = payload;
    try {
      const response = await axios.get(
        `${user_API_ENDPOINT}?city=${destination}&min=${min}&max=${max}`,
        jsonTypeConfig(false),
      );
      return response.data.users;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

const usersSlicer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getAllUsers.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: action.payload,
          error: {},
        }))
      .addCase(getAllUsers.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(deleteUser.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(deleteUser.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: filterDeleted(state.data, action.payload.user._id),
          error: {},
        }))
      .addCase(deleteUser.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(addUser.pending, (state, action) => (
        { ...state, loading: true, error: {}, message: action.payload }))
      .addCase(addUser.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: [...state.data, action.payload],
          error: {},
        }))
      .addCase(addUser.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
    /* .addCase(getuser.pending, (state) => (
      { ...state, loading: true, error: {} }))
    .addCase(getuser.fulfilled, (state, action) => (
      {
        ...state,
        loading: false,
        userDetails: action.payload,
        error: {},
      }))
    .addCase(getuser.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
    .addCase(searchByQuery.pending, (state) => (
      { ...state, loading: true, error: {} }))
    .addCase(searchByQuery.fulfilled, (state, action) => (
      {
        ...state,
        loading: false,
        searchedusers: action.payload,
        error: {},
      }))
    .addCase(searchByQuery.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
    .addCase(getCountByCity.pending, (state) => (
      { ...state, loading: true, error: {} }))
    .addCase(getCountByCity.fulfilled, (state, action) => (
      {
        ...state,
        loading: false,
        countByCity: action.payload,
        error: {},
      }))
    .addCase(getCountByCity.rejected, (state, action) => ({ ...state, loading: false, error: action.payload })); */
  },
});

export default usersSlicer.reducer;
