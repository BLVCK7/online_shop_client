import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAddBasketThunk } from '../../redux/reducers/BasketSlice';

const ProductButton = ({ deviceidAllProducts, deviceidSortProduct }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { allDevices } = useSelector((state) => state.deviceReducer);

  const onAddItemOnBasket = () => {
    allDevices.length > 0
      ? dispatch(setAddBasketThunk({ userid: user.id, deviceid: deviceidAllProducts }))
      : dispatch(setAddBasketThunk({ userid: user.id, deviceid: deviceidSortProduct }));
  };

  return (
    <div className="">
      <button
        onClick={onAddItemOnBasket}
        className="w-full text-gray-600 bg-white rounded border-slate-300 border text-center px-4 py-2 drop-shadow-sm hover:bg-gray-500 hover:text-white mt-3">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductButton;
