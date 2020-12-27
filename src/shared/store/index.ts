import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './reducers';
import { RoomState } from './reducers';

export type RootState = {
  rooms: RoomState;
};

export const store = configureStore({
  reducer: combinedReducer,
});
