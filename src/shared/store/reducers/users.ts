import { createSlice } from '@reduxjs/toolkit';

type State = {
  user?: string;
};
const userSlice = createSlice({
  name: 'users',
  initialState: {} as State,
  reducers: {
    userLogin(state: State, action: { type: string; payload: any }) {
      state.user = action.payload;
    },
  },
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
