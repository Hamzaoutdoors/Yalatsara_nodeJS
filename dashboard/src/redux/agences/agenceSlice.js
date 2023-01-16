import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AGENCIES_API_ENDPOINT = 'http://localhost:8800/api/agences';

const initialState = {
  loading: false,
  data: [],
  agenceDetails: {},
  searchedAgences: [],
  countByCity: [],
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

export const getAgences = createAsyncThunk(
  'redux/agences/getAgences.js',
  async (payload, { rejectWithValue }) => {
    try {
      const reponse = await axios.get(
        AGENCIES_API_ENDPOINT,
        jsonTypeConfig(false),
      );
      return reponse.data.agences;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

const filterDeleted = (data, id) => data.filter((item) => item._id !== id);

export const deleteAgency = createAsyncThunk(
  'redux/agencies/deleteAgency.js',
  async (payload, { rejectWithValue }) => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;
    const config = jsonTypeConfig(token);
    try {
      const reponse = await axios.delete(
        `${AGENCIES_API_ENDPOINT}/find/${payload}`,
        config,
      );
      return reponse.data.agence;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
);

/* export const getCountByCity = createAsyncThunk(
  'redux/agences/countByCity.js',
  async (payload, { rejectWithValue }) => {
    const citiesToString = payload.toString();
    try {
      const reponse = await axios.get(
        `${AGENCIES_API_ENDPOINT}/countByCity?cities=${citiesToString}`,
        jsonTypeConfig(false),
      );
      return reponse.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

/* export const searchByQuery = createAsyncThunk(
  'redux/agences/search.js',
  async (payload, { rejectWithValue }) => {
    const {destination, min, max} = payload;
    try {
      const reponse = await axios.get(
        `${AGENCIES_API_ENDPOINT}?city=${destination}&min=${min}&max=${max}`,
        jsonTypeConfig(false),
      );
      return reponse.data.agences;
    } catch (err) {
      return rejectWithValue({ err });
    }
  },
); */

const agencesSlicer = createSlice({
  name: 'agences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgences.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(getAgences.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: action.payload,
          error: {},
        }))
      .addCase(getAgences.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
      .addCase(deleteAgency.pending, (state) => (
        { ...state, loading: true, error: {} }))
      .addCase(deleteAgency.fulfilled, (state, action) => (
        {
          ...state,
          loading: false,
          data: filterDeleted(state.data, action.payload._id),
          error: {},
        }))
      .addCase(deleteAgency.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
  },
});

export default agencesSlicer.reducer;
