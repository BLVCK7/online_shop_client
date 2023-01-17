import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDivicesThunk } from '../redux/reducers/DeviceSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { allDevices, status } = useSelector((state) => state.deviceReducer);

  React.useEffect(() => {
    dispatch(setDivicesThunk());
  }, []);

  if (status === 'loading')
    return <div className="flex justify-center items-center m-auto">Loading...</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:pt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center md:text-left">
          Покупатели предпочитают
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allDevices.map((product) => (
            <Link reloadDocument key={product.id} to={'device/' + product.id}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={process.env.REACT_APP_API_URL + product.img}
                    alt={product.img}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span className="font-bold">{product.brand.name + ' '}</span>
                      <span aria-hidden="true" className="absolute inset-0" />

                      {product.name.length > 10 ? product.name.slice(0, 10) + '...' : product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price + 'р.'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
