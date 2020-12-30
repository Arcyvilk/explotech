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
  loginStatus: {
    roomId?: string;
    status: 'pending' | 'rejected' | 'fulfilled' | 'inactive';
  };
};

const path = 'http://localhost:2021/api';

// -------------------------------------
// -------------- REDUCERS -------------
// -------------------------------------
export const logIntoRoom = createAsyncThunk(
  'rooms/logIntoRoom',
  async (
    {
      roomId,
      nickname,
      password,
    }: { roomId: string; nickname: string; password?: string },
    { rejectWithValue },
  ) => {
    // @ts-ignore
    const data = {
      roomId,
      nickname,
      password,
    };
    try {
      const response = await fetch(`${path}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201 || response.status === 204) {
        return {
          roomId,
          nickname,
        };
      } else {
        throw response.status;
      }
    } catch (error) {
      rejectWithValue(error.response.data);
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
    loginStatus: {
      roomId: undefined,
      status: 'inactive',
    },
  } as RoomState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logIntoRoom.pending, state => {
      state.loginStatus = {
        // @ts-ignore
        status: 'pending',
      };
    });
    builder.addCase(logIntoRoom.rejected, (state, action) => {
      console.log(action);
      state.loginStatus = {
        // @ts-ignore
        // roomId: payload?.roomId,
        roomId: 'dupa',
        status: 'rejected',
      };
    });
    builder.addCase(logIntoRoom.fulfilled, (state, { payload }) => {
      // @ts-ignore
      const { roomId, nickname } = payload;
      const room = {
        roomId,
        nickname,
        color: '#ff0000',
      };
      const oldRooms = state.active.filter(
        (oldRoom: Room) => oldRoom.roomId !== room.roomId,
      );
      state.active = [...oldRooms, room];
      state.loginStatus = {
        roomId,
        status: 'fulfilled',
      };
    });
  },
});

const roomReducer = roomSlice.reducer;

export default combineReducers({
  rooms: roomReducer,
});
