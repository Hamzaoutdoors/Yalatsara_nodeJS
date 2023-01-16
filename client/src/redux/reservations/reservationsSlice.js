import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATION_API_ENDPOINT = 'http://localhost:8800/api/reservations';

const initialState = {
  loading: false,
  reservationDetails: {},
  error: {},
  data: [],
  utils: {
    openModal: false,
  },
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

const filterDeleted = (data, id) => data.filter(
  (reservationObj) => reservationObj._id !== parseInt(id, 10),
);

export const bookReservation = createAsyncThunk(
  'redux/reservations/createReservation.js',
  async (payload, { rejectWithValue }) => {
    const data = payload;
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const token = (user_data) ? user_data.token : null;
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
    const config = jsonTypeConfig(false);
    try {
      const res = await axios.delete(`${RESERVATION_API_ENDPOINT}/${payload}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

// ???

export const getMyReservations = createAsyncThunk(
  'redux/reservations/getreservation.js',
  async (payload, { rejectWithValue }) => {
    try {
      const reponse = await axios.get(
        `${RESERVATION_API_ENDPOINT}`,
        jsonTypeConfig(false),
      );
      return reponse.data.reservations;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const reservationsSlicer = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    expandModal: (state, action) => {
      const reservations = state;
      reservations.utils.openModal = action.payload;
      return reservations;
    },
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
      .addCase(getMyReservations.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getMyReservations.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: action.payload,
          error: {},
        }))
      .addCase(getMyReservations.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
  },
});

export default reservationsSlicer.reducer;
export const { expandModal } = reservationsSlicer.actions;
