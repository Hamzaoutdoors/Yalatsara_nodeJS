import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const AGENCE_API_ENDPOINT = 'http://localhost:8800/api/agences';

const initialState = {
    loading: false,
    agences: [],
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
                AGENCE_API_ENDPOINT,
                jsonTypeConfig(false)
            );
            return reponse.data.agences;
        } catch (err) {
            return rejectWithValue({ err })
        }
    }
);

export const getCountByCity = createAsyncThunk(
    'redux/agences/countByCity.js',
    async (payload, { rejectWithValue }) => {
        const citiesToString = payload.toString();
        try {
            const reponse = await axios.get(
                `${AGENCE_API_ENDPOINT}/countByCity?cities=${citiesToString}`,
                jsonTypeConfig(false)
            );
            return reponse.data;
        } catch (err) {
            return rejectWithValue({ err })
        }
    }
);


const agencesSlicer = createSlice({
    name: 'agences',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAgences.pending, (state) => (
                { ...state, loading: true, error: {} })
            )
            .addCase(getAgences.fulfilled, (state, action) => (
                {
                    ...state,
                    loading: false,
                    agences: action.payload,
                    error: {},
                }))
            .addCase(getAgences.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))
            .addCase(getCountByCity.pending, (state) => (
                { ...state, loading: true, error: {} })
            )
            .addCase(getCountByCity.fulfilled, (state, action) => (
                {
                    ...state,
                    loading: false,
                    countByCity: action.payload,
                    error: {},
                }))
            .addCase(getCountByCity.rejected, (state, action) => ({ ...state, loading: false, error: action.payload }))

    }
});

export default agencesSlicer.reducer;