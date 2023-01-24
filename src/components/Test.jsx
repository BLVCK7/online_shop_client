import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBrand } from '../http/brandAPI';
import { getTypes } from '../http/typeAPI';
import { BrandSlice } from '../redux/reducers/BrandSlice';
import { TypeSlice } from '../redux/reducers/TypeSlice';
import { DEVICE_ROUTE, sortOptions } from '../utils/consts';
import Pagination from './Pagination';
import ProductList from './ProductList';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Test = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.typeReducer);
  const { brand } = useSelector((state) => state.brandReducer);
  const { setTypes } = TypeSlice.actions;
  const { setBrand } = BrandSlice.actions;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeSort, setActiveSort] = React.useState('Сначала популярные');

  React.useEffect(() => {
    getTypes().then((data) => dispatch(setTypes(data)));
    getBrand().then((data) => dispatch(setBrand(data)));
  }, []);

  return (
    <div>
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
                  <Link reloadDocument to={DEVICE_ROUTE + `?typeId=${category.id}`}>
                    <li key={category.id}>
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
                        {brand.map((option, optionIdx) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              id={`filter-brands-${optionIdx}`}
                              name="brands"
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-brands-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600">
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
              <ProductList />
            </div>
          </div>
          <Pagination />
        </section>
      </main>
    </div>
  );
};

export default Test;
