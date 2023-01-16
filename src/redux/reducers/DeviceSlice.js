import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allDevices: [],
  device: [],
};

export const DeviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevices(state, action) {
      state.allDevices = action.payload;
    },
    setOneDevice(state, action) {
      state.device = action.payload;
    },
  },
});

export default DeviceSlice.reducer;
