import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDevices, getOneDevice } from '../../http/deviceAPI';

export const setDivicesThunk = createAsyncThunk('device/setDivicesThunk', async (_, thunkAPI) => {
  try {
    let response = await getDevices();

    return response.rows;
  } catch (error) {
    alert(error.response?.data?.message);
  }
});

export const setDeviceInfoThunk = createAsyncThunk('device/setDeviceInfoThunk', async (id) => {
  try {
    const response = await getOneDevice(id).then((data) => data);

    return response;
  } catch (error) {
    alert(error.response?.data?.message);
  }
});

const initialState = {
  allDevices: [],
  device: [],
  status: 'loading',
};

export const DeviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {},
  extraReducers: {
    // setDivicesThunk
    [setDivicesThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setDivicesThunk.fulfilled]: (state, action) => {
      state.allDevices = action.payload;
      state.status = 'loaded';
    },
    [setDivicesThunk.rejected]: (state) => {
      state.allDevices = null;
      state.status = 'error';
    },
    // setDeviceInfoThunk
    [setDeviceInfoThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setDeviceInfoThunk.fulfilled]: (state, action) => {
      state.device = action.payload;
      state.status = 'loaded';
    },
    [setDeviceInfoThunk.rejected]: (state) => {
      state.device = null;
      state.status = 'error';
    },
  },
});

export default DeviceSlice.reducer;
