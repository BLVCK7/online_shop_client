import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setDivicesThunk } from '../redux/reducers/DeviceSlice';
import ProductListAll from './ProductListStates/ProductListAll';
import ProductListEmpty from './ProductListStates/ProductListEmpty';
import ProductListType from './ProductListStates/ProductListType';

export default function ProductList() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { allDevices, status, typeDevices } = useSelector((state) => state.deviceReducer);

  React.useEffect(() => {
    dispatch(setDivicesThunk());
  }, []);

  React.useEffect(() => {
    console.log(location);
  }, [location.search]);

  if (status === 'loading')
    return <div className="flex justify-center items-center m-auto">Loading...</div>;

  return (
    <div className="bg-white">
      {allDevices.length === 0 && typeDevices.length === 0 ? (
        <ProductListEmpty />
      ) : allDevices.length > 0 ? (
        <ProductListAll />
      ) : (
        <ProductListType />
      )}
    </div>
  );
}
