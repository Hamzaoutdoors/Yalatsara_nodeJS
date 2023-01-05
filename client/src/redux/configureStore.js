import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agenceReducer from './agences/agenceSlice';

const rootReducer = combineReducers({
    agences: agenceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;