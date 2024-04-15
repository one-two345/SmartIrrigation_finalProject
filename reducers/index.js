import { combineReducers } from 'redux';


import sensorsContent from './sensorsContent';
//import auth from './auth';
import authSlice from './authSlice';

export const reducers = combineReducers({  sensorsContent, authSlice });