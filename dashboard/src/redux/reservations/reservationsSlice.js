import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATION_API_ENDPOINT = 'http://localhost:8800/api/reservations';

const initialState = {
  loading: false,
  reservationDetails: {},
  error: {},
  data: [],
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

const filterDeleted = (data, id) => data.filter((item) => item._id !== id);

export const bookReservation = createAsyncThunk(
  'redux/reservations/createReservation.js',
  async (payload, { rejectWithValue }) => {
    const data = payload;
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const res = await axios.post(
        `${RESERVATION_API_ENDPOINT}`,
        data,
        config,
      );
      console.log(res.data);
      return res.data.reservation;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

export const cancelReservation = createAsyncThunk(
  'redux/reservations/deleteReservation.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const res = await axios.delete(`${RESERVATION_API_ENDPOINT}/${payload}`, config);
      return res.data.reservation;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

export const updateReservation = createAsyncThunk(
  'redux/reservations/updateReservation.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const res = await axios.patch(`${RESERVATION_API_ENDPOINT}/${payload._id}`, config);
      return res.data.reservation;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

// ???

export const getAllReservations = createAsyncThunk(
  'redux/reservations/getAllReservation.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const response = await axios.get(
        RESERVATION_API_ENDPOINT,
        config,
      );
      return response.data.reservations;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const reservationsSlicer = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    removeUnexistingReservations: (state, payload) => ({
      ...state,
      data: state.data.filter((book) => book.trip !== payload),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookReservation.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(bookReservation.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: [...state.data, action.payload],
          error: {},
        }))
      .addCase(bookReservation.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(cancelReservation.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(cancelReservation.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: filterDeleted(state.data, action.payload._id),
          error: {},
        }))
      .addCase(cancelReservation.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(getAllReservations.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getAllReservations.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: action.payload,
          error: {},
        }))
      .addCase(getAllReservations.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
  },
});

export default reservationsSlicer.reducer;
export const { removeUnexistingReservations } = reservationsSlicer.actions;
