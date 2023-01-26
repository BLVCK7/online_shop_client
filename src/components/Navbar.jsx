import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { UserSlice } from '../redux/reducers/UserSlice';
import { setDivicesThunk } from '../redux/reducers/DeviceSlice';

const solutions = [
  {
    name: 'Админ панель',
    description: 'Добавляй новые бренды, типы и разновидности товаров.',
    href: ADMIN_ROUTE,
    icon: ChartBarIcon,
  },
  {
    name: 'Магазин',
    description: 'Выбери то, что ты хочешь и купи прямо сейчас!',
    href: SHOP_ROUTE,
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Корзина',
    description: 'Перейди к оплате и заверши покупку.',
    href: BASKET_ROUTE,
    icon: ShieldCheckIcon,
  },
];

export default function Navbar() {
  const [burger, setBurger] = React.useState(false);

  const { isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { setAuth, setLogout } = UserSlice.actions;

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLogout());
    dispatch(setAuth(false));
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link reloadDocument to="/">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>

          {/* Burger menu mobile device */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button
              onClick={() => setBurger((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* Desktop */}
          {isAuth && (
            <>
              <Link
                to={ADMIN_ROUTE}
                className="hidden md:block text-base font-medium text-gray-500 hover:text-gray-900">
                Админ панель
              </Link>
              <Link
                to={BASKET_ROUTE}
                className="hidden md:block text-base font-medium text-gray-500 hover:text-gray-900">
                Корзина
              </Link>
            </>
          )}

          {!isAuth ? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link
                to={LOGIN_ROUTE}
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Войти
              </Link>
              <Link
                to={REGISTRATION_ROUTE}
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Зарегистрироваться
              </Link>
            </div>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <button
                onClick={onLogout}
                to={LOGIN_ROUTE}
                className="whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 hover:text-white">
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      {isAuth ? (
        <div
          className={`${
            burger ? 'flex' : 'hidden'
          } flex-col justify-center items-start rounded-md w-3/4 m-auto bg-white text-white drop-shadow-md mt-5 py-5`}>
          <div className="mt-6 ml-6">
            <nav className="grid gap-y-8">
              <Link
                to={ADMIN_ROUTE}
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                <span
                  className="ml-3 text-base font-medium text-gray-900"
                  onClick={() => setBurger((prev) => !prev)}>
                  Админ панель
                </span>
              </Link>

              <Link
                to={BASKET_ROUTE}
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
                <span
                  className="ml-3 text-base font-medium text-gray-900"
                  onClick={() => setBurger((prev) => !prev)}>
                  Корзина
                </span>
              </Link>

              <button
                onClick={onLogout}
                to={LOGIN_ROUTE}
                className="whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 hover:text-white">
                Выйти
              </button>
            </nav>
          </div>
        </div>
      ) : (
        <div
          className={`${
            burger ? 'flex' : 'hidden'
          }  flex-col justify-center items-center rounded-md w-3/4 m-auto bg-white text-white drop-shadow-md mt-5`}>
          <Link to={REGISTRATION_ROUTE} onClick={() => setBurger((prev) => !prev)}>
            <button className="w-fit px-5 bg-indigo-600 rounded-lg h-10 my-5 drop-shadow-md">
              Зарегистрироваться
            </button>
          </Link>
          <div className="mb-5">
            <span className="text-gray-400">Уже есть аккаунт? </span>
            <Link
              to={LOGIN_ROUTE}
              className="text-indigo-600 font-bold"
              onClick={() => setBurger((prev) => !prev)}>
              Войти
            </Link>
          </div>
        </div>
      )}
    </Popover>
  );
}
