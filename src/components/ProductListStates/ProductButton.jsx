import React from 'react';

const ProductButton = ({ allDevices, typeDevices }) => {
  return (
    <div className="">
      <button className="w-full text-gray-600 bg-white rounded border-slate-300 border text-center px-4 py-2 drop-shadow-sm hover:bg-gray-500 hover:text-white mt-3">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductButton;
