import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketThunk, setDeleteOneBasketThunk } from '../redux/reducers/BasketSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { basket, status } = useSelector((state) => state.basketReducer);

  React.useEffect(() => {
    dispatch(setBasketThunk({ userid: user.id }));
  }, []);

  const onClickDeleteItem = (deviceId) => {
    dispatch(setDeleteOneBasketThunk({ userid: user.id, deviceid: deviceId }));
  };

  if (status === 'loading') return <div>Загрузка...</div>;

  return (
    <div className="flex flex-col px-10">
      <h1 className="text-center text-3xl font-medium text-gray-900 mt-7 mb-10">
        Корзина{' '}
        <span className="opacity-20 text-xl">
          {basket.reduce((acc, value) => acc + value.quantity, 0)}
        </span>
      </h1>

      {basket.length === 0 ? (
        <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:pt-2 sm:px-6 lg:max-w-7xl lg:px-8 w-full">
          <div className="text-center flex justify-center items-center m-auto h-64 w-full ">
            <h1 className="text-2xl text-gray-300 opacity-60">Нет товаров</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="lg:px-96 md:mt-5">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {basket.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={process.env.REACT_APP_API_URL + product.device.img}
                      alt={product.device.img}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <span>
                            {product.device?.brand?.name}{' '}
                            {product.device?.name.length > 20
                              ? product.device?.name.slice(0, 20) + '...'
                              : product.device?.name}
                          </span>
                        </h3>
                        <p className="ml-4">{product.device.price * product.quantity + 'р.'}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm md:justify-between">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 border border-gray-400 rounded-md flex justify-center">
                          <div className="flex justify-center items-center">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="1.5em"
                              width="1.5em"
                              className="text-gray-500">
                              <path
                                fill="currentColor"
                                d="M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
                              />
                            </svg>
                          </div>
                        </div>

                        <p className="text-gray-500 text-xl text-center">{product.quantity}</p>

                        <div className="w-7 h-7 border border-gray-400 rounded-md flex justify-center">
                          <div className="flex justify-center items-center">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="1.5em"
                              width="1.5em"
                              className="text-gray-500">
                              <path
                                fill="currentColor"
                                d="M12 4a1 1 0 00-1 1v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 00-1-1z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => onClickDeleteItem(product.deviceId)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500">
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="mt-8 lg:px-96 md:mt-16 ">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Сумма</p>
          <p>
            {basket.reduce(
              (acc, currentValue) => acc + currentValue.device.price * currentValue.quantity,
              0,
            )}
            р.
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Стоимость отправки и скидки будут посчитаны при оплате.
        </p>
        <div className="mt-6">
          <button className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Оплатить
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            или{' '}
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 mb-5">
                Вернуться к покупкам
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Basket;
