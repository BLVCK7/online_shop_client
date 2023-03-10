import React, { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

import { getTypes } from '../http/typeAPI';
import { useDispatch, useSelector } from 'react-redux';
import { TypeSlice } from '../redux/reducers/TypeSlice';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandSlice } from '../redux/reducers/BrandSlice';
import { getBrand } from '../http/brandAPI';
import Pagination from '../components/Pagination';
import { sortOptions } from '../utils/consts';
import axios from 'axios';
import { setTypeDevices } from '../redux/reducers/DeviceSlice';
import { useGetBrandedDevicesQuery } from '../redux/services/userApi';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Shop() {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const { type } = useSelector((state) => state.typeReducer);
  const { brand } = useSelector((state) => state.brandReducer);
  const { data: brandData, isLoading: isLoadingTypes } = useGetBrandedDevicesQuery(location.search);

  console.log(location.search);

  const { setTypes } = TypeSlice.actions;
  const { setBrand } = BrandSlice.actions;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeSort, setActiveSort] = React.useState('Сначала популярные');

  React.useEffect(() => {
    getTypes().then((data) => dispatch(setTypes(data)));
    getBrand().then((data) => {
      dispatch(setBrand(data));
      setObj(data);
    });
  }, []);

  const [obj, setObj] = React.useState();
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    let string = ['device?', ...value].join('brandId=');
    navigate(string);
  }, [value]);

  const handlerCheckBox = (e) => {
    setObj((prev) =>
      prev.map((item) =>
        (item.id === Number(e.target.id)) & (item.checked === false || item.checked === undefined)
          ? { ...item, checked: true }
          : (item.id === Number(e.target.id)) & (item.checked === true)
          ? { ...item, checked: false }
          : { ...item },
      ),
    );

    if (!obj.find((item) => (item.checked === true) & (item.id === Number(e.target.id)))) {
      setValue((prev) => [...prev, Number(e.target.id) + '&'].sort((a, b) => a.localeCompare(b)));
    } else {
      setValue(
        value.filter((f) => f !== Number(e.target.id) + '&').sort((a, b) => a.localeCompare(b)),
      );
    }
  };

  console.log(obj);
  console.log(value);
  console.log('brand', brandData);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Закрыть меню</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Категории</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {type.map((category) => (
                        <Link key={category.id} to={`/device?typeId=${category.id}`}>
                          <li>
                            <span className="block px-2 py-3">{category.name}</span>
                          </li>
                        </Link>
                      ))}
                    </ul>

                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Бренды</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {brand.map((option, optionIdx) => (
                                <div key={option.id} className="flex items-center">
                                  <input
                                    id={`filter-mobile-brands-${optionIdx}`}
                                    name="brands"
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-brands-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Desktop section */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-end border-b border-gray-200 pt-6 pb-6">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1> */}

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {activeSort}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    <div className="py-1 cursor-pointer">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          <span
                            onClick={() => setActiveSort(option.name)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              activeSort === option.name ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}>
                            {option.name}
                          </span>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Фильтры</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop section */}
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Категории</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {type.map((category) => (
                    <Link
                      onClick={() =>
                        axios
                          .get(`http://localhost:5000/api/device?typeId=${category.id}`)
                          .then((res) => dispatch(setTypeDevices(res.data.rows)))
                      }
                      key={category.id}
                      to={`/device?typeId=${category.id}`}>
                      <li>
                        <span className="block px-2 py-3">{category.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Бренды</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {brand.map((option) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                name={option.name}
                                type="checkbox"
                                id={option.id}
                                defaultChecked={option.checked}
                                onChange={(e) => handlerCheckBox(e)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={option.id} className="ml-3 text-sm text-gray-600">
                                {option.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <Outlet />
              </div>
            </div>
            <Pagination />
          </section>
        </main>
      </div>
    </div>
  );
}
