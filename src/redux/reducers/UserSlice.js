import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../http/userAPI';

export const setAllUsersThunk = createAsyncThunk('user/setAllUsersThunk', async (_, thunkAPI) => {
  try {
    let response = await getUsers();

    return response;
  } catch (error) {
    alert(error.response?.data?.message);
  }
});

const initialState = {
  user: [],
  isAuth: false,
  allUsers: [],
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
  extraReducers: {
    // setDivicesThunk
    [setAllUsersThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setAllUsersThunk.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
      state.status = 'loaded';
    },
    [setAllUsersThunk.rejected]: (state) => {
      state.allUsers = null;
      state.status = 'error';
    },
  },
});

export default UserSlice.reducer;
