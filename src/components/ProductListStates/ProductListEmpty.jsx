import React from 'react';

const ProductListEmpty = () => {
  return (
    <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:pt-2 sm:px-6 lg:max-w-7xl lg:px-8 w-full">
      <div className="text-center flex justify-center items-center m-auto h-64 w-full ">
        <h1 className="text-2xl text-gray-300 opacity-60">Нет товаров</h1>
      </div>
    </div>
  );
};

export default ProductListEmpty;
