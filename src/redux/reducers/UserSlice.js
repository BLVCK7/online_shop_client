import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  isAuth: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLogout(state, action) {
      state.user = [];
    },
  },
});

export default UserSlice.reducer;
