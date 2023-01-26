import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addBasket, deleteBasket, getBasket } from '../../http/basketAPI';

export const setBasketThunk = createAsyncThunk('basket/setBasketThunk', async (userid) => {
  try {
    const response = await getBasket(userid).then((data) => data);

    return response;
  } catch (error) {
    alert(error.response?.data?.message);
  }
});

export const setAddBasketThunk = createAsyncThunk('basket/setAddBasketThunk', async (result) => {
  const { userid, deviceid } = result;

  try {
    const response = await addBasket(userid, deviceid).then((data) => data);

    return response;
  } catch (error) {
    alert(error.response?.data?.message);
  }
});

export const setDeleteOneBasketThunk = createAsyncThunk(
  'basket/setDeleteOneBasketThunk',
  async (result) => {
    const { userid, deviceid } = result;

    try {
      const response = await deleteBasket(userid, deviceid).then((data) => data);

      return response;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  },
);

const initialState = {
  basket: [],
  status: 'loading',
};

export const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // setTypeDevices(state, action) {
    //   state.typeDevices = action.payload;
    //   state.allDevices = [];
    // },
  },
  extraReducers: {
    // setBasketThunk
    [setBasketThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setBasketThunk.fulfilled]: (state, action) => {
      state.basket = action.payload;
      state.status = 'loaded';
    },
    [setBasketThunk.rejected]: (state) => {
      state.basket = null;
      state.status = 'error';
    },
    // setDeleteOneBasketThunk
    [setDeleteOneBasketThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setDeleteOneBasketThunk.fulfilled]: (state, action) => {
      state.basket = action.payload;
      state.status = 'loaded';
    },
    [setDeleteOneBasketThunk.rejected]: (state) => {
      state.basket = null;
      state.status = 'error';
    },
    // setAddBasketThunk
    [setAddBasketThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [setAddBasketThunk.fulfilled]: (state, action) => {
      state.basket = [...state.basket, action.payload];
      state.status = 'loaded';
    },
    [setAddBasketThunk.rejected]: (state) => {
      state.basket = [...state.basket];
      state.status = 'error';
    },
  },
});

// export const { setTypeDevices } = BasketSlice.actions;

export default BasketSlice.reducer;
