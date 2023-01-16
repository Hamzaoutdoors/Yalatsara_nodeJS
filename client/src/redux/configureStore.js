import { configureStore } from '@reduxjs/toolkit'
import agenceReducer from './agences/agenceSlice';
import tripReducer from './trips/tripSlice';
import authReducer from './auth/authSlice';
import reservationsReducer from './reservations/reservationsSlice';

const reducer = {
  agences: agenceReducer,
  trips: tripReducer,
  auth: authReducer,
  reservations: reservationsReducer,
};

const store = configureStore({
  reducer,
  devTools: true
});

export default store;
