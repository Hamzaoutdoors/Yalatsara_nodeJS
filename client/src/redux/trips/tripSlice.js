import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TRIP_API_ENDPOINT = 'http://localhost:8800/api/trips';

const initialState = {
  loading: false,
  trips: [],
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
  'redux/trips/gettrips.js',
  async (payload, { rejectWithValue }) => {
    try {
      const reponse = await axios.get(
        TRIP_API_ENDPOINT,
        jsonTypeConfig(false),
      );
      return reponse.data.trips;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

export const getTrip = createAsyncThunk(
  'redux/trips/getTrip.js',
  async (payload, { rejectWithValue }) => {
    try {
      const reponse = await axios.get(
        `${TRIP_API_ENDPOINT}/${payload}`,
        jsonTypeConfig(false),
      );
      return reponse.data.trip;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

export const searchTripsByQuery = createAsyncThunk(
  'redux/trips/searchTrips.js',
  async (payload, { rejectWithValue }) => {
    const {destination, min, max} = payload;
    try {
      const reponse = await axios.get(
        `${TRIP_API_ENDPOINT}?destination=${destination}&min=${min || 1}&max=${max || 100000}`,
        jsonTypeConfig(false),
      );
      return reponse.data.trips;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const tripsSlicer = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getTrips.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          trips: action.payload,
          error: {},
        }))
      .addCase(getTrips.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(getTrip.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getTrip.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          tripDetails: action.payload,
          error: {},
        }))
      .addCase(getTrip.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(searchTripsByQuery.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(searchTripsByQuery.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          searchedTrips: action.payload,
          error: {},
        }))
      .addCase(searchTripsByQuery.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
  },
});

export default tripsSlicer.reducer;
