import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './reducers';
import { RoomState } from './reducers';

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = {
  rooms: RoomState;
};

export type DispatchType = typeof store.dispatch;
