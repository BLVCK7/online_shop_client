import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: [],
};

export const BrandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
  },
});

export default BrandSlice.reducer;
