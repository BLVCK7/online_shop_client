import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: [],
};

export const TypeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypes(state, action) {
      state.type = action.payload;
    },
  },
});

export default TypeSlice.reducer;
