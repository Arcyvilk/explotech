import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './reducers';

export const store = configureStore({
  reducer: combinedReducer,
});
