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
    code?: number;
  };
};

const path = 'http://localhost:2021/api';

// -------------------------------------
// -------------- REDUCERS -------------
// -------------------------------------
export const logIntoRoom = createAsyncThunk(
  'rooms/logIntoRoom',
  async (data: {
    roomId: string;
    nickname: string;
    password?: string;
  }): Promise<{
    roomId: string;
    nickname: string;
    status?: number;
    error?: { status: number; response: { data: any } };
  }> => {
    const { roomId, nickname } = data;
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
          status: response.status,
        };
      } else {
        throw response.status;
      }
    } catch (error) {
      return {
        roomId,
        nickname,
        status: error.status,
        error: error.response.data,
      };
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
    builder.addCase(logIntoRoom.rejected, (state, { payload }) => {
      state.loginStatus = {
        // @ts-ignore
        roomId: payload.roomId,
        status: 'rejected',
        // @ts-ignore
        code: payload.status,
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
        code: payload.status,
      };
    });
  },
});

const roomReducer = roomSlice.reducer;

export default combineReducers({
  rooms: roomReducer,
});
