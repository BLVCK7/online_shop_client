import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

const Basket = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .post('http://localhost:5000/api/basket', { userid: user.id })
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="flex flex-col px-10">
      <h1 className="text-center font-bold text-black text-2xl my-10">Корзина товаров</h1>
      <div className="md:px-60 md:mt-5">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {data.map((product) => (
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
                      <a href={product.href}>{product.device.name}</a>
                    </h3>
                    <p className="ml-4">{product.device.price + 'р.'}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty</p>

                  <div className="flex">
                    <button
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

      <div className="mt-8 md:px-60 md:mt-5">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Сумма</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Стоимость отправки и скидки будут посчитаны при оплате.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Оплатить
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            или{' '}
            <Link to="/">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
