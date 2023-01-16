import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TRIP_API_ENDPOINT = 'http://localhost:8800/api/trips';

const initialState = {
  loading: false,
  data: [],
  searchedTrips: [],
  tripDetails: {},
  error: {},
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

export const getTrips = createAsyncThunk(
  'redux/trips/getTrips.js',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        TRIP_API_ENDPOINT,
        jsonTypeConfig(false),
      );

      return response.data.trips;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const filterDeleted = (data, id) => data.filter((item) => item._id !== id);

export const deleteTrip = createAsyncThunk(
  'redux/trips/deleteTrip.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const response = await axios.delete(
        `${TRIP_API_ENDPOINT}/${payload}`,
        config,
      );
      return response.data.trip;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

export const addTrip = createAsyncThunk(
  'redux/trips/addTrip.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const response = await axios.post(
        TRIP_API_ENDPOINT,
        payload,
        config,
      );
      return response.data.trip;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

/* export const searchTripsByQuery = createAsyncThunk(
  'redux/trips/searchTrips.js',
  async (payload, { rejectWithValue }) => {
    const {destination, min, max} = payload;
    try {
      const response = await axios.get(
        `${TRIP_API_ENDPOINT}?destination=${destination}&min=${min || 1}&max=${max || 100000}`,
        jsonTypeConfig(false),
      );
      return response.data.trips;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

const tripsSlicer = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    removeUnexistingTrips: (state, payload) => ({
      ...state,
      data: state.data.filter((trip) => trip.agence.id !== payload),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getTrips.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: action.payload,
          error: {},
        }))
      .addCase(getTrips.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(deleteTrip.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(deleteTrip.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: filterDeleted(state.data, action.payload._id),
          error: {},
        }))
      .addCase(deleteTrip.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(addTrip.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(addTrip.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: [...state.data, action.payload],
          error: {},
        }))
      .addCase(addTrip.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
  },
});

export const { removeUnexistingTrips } = tripsSlicer.actions;
export default tripsSlicer.reducer;
