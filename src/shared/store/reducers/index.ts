import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import fetch from 'node-fetch';

export type Room = {
  roomId: string;
  nickname: string;
  color: string;
};
export type RoomState = {
  active: Room[];
};

const path = 'http://localhost:2021/api';

// -------------------------------------
// -------------- REDUCERS -------------
// -------------------------------------
export const logIntoRoom = createAsyncThunk(
  'rooms/logIntoRoom',
  async ({ roomId, nickname }: { roomId: string; nickname: string }) => {
    const data = {
      roomId,
      nickname,
    };
    try {
      const test = await fetch(`${path}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log(test);
      return test;
    } catch (error) {
      return error.response.data;
    }
  },
);

// -------------------------------------
// ---------------- MAIN ---------------
// -------------------------------------
const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    active: [],
  } as RoomState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logIntoRoom.pending, () => {
      console.log('pending');
    });
    builder.addCase(logIntoRoom.rejected, () => {
      console.log('rejected');
    });
    builder.addCase(logIntoRoom.fulfilled, (state, { payload }) => {
      console.log('dupa');
      const room = {
        roomId: payload.roomId,
        nickname: payload.nickname,
        color: '#ff0000',
      };
      const oldRooms = state.active.filter(
        (oldRoom: Room) => oldRoom.roomId !== room.roomId,
      );
      state.active = [...oldRooms, room];
    });
  },
});

const roomReducer = roomSlice.reducer;

export default combineReducers({
  rooms: roomReducer,
});
