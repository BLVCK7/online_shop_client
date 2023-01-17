import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  allDevices: [],
  device: [],
};

export const DeviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevices(state, action) {
      state.allDevices = action.payload;
      state.isLoading = false;
    },
    setOneDevice(state, action) {
      state.device = action.payload;
      state.isLoading = false;
    },
  },
});

export default DeviceSlice.reducer;
