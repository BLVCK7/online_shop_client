import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import typeReducer from './reducers/TypeSlice';
import brandReducer from './reducers/BrandSlice';
import deviceReducer from './reducers/DeviceSlice';
import basketReducer from './reducers/BasketSlice';

const rootReducer = combineReducers({
  userReducer,
  typeReducer,
  brandReducer,
  deviceReducer,
  basketReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
