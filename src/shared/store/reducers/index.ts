import { combineReducers, createSlice } from '@reduxjs/toolkit';

export type Room = {
  roomId: string;
  nickname: string;
  color: string;
};
export type RoomState = {
  active: Room[];
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    active: [],
  } as RoomState,
  reducers: {
    /**
     * Logs user into a specific room.
     */
    logIntoRoom(state: RoomState, action: { type: string; payload: any }) {
      const room = {
        roomId: action.payload.roomId,
        nickname: action.payload.nickname,
        color: '#ff0000',
      };
      const oldRooms = state.active.filter(
        (oldRoom: Room) => oldRoom.roomId !== room.roomId,
      );
      state.active = [...oldRooms, room];
    },
  },
});

const roomReducer = roomSlice.reducer;

export const { logIntoRoom } = roomSlice.actions;
export default combineReducers({
  rooms: roomReducer,
});
