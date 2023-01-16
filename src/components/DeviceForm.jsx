import React from 'react';
import { useSelector } from 'react-redux';

export default function DeviceForm({
  name,
  setName,
  price,
  setPrice,
  brandId,
  setBrandId,
  typeId,
  setTypeId,
  file,
  setFile,
  info,
  changeInfo,
}) {
  const { type } = useSelector((state) => state.typeReducer);
  const { brand } = useSelector((state) => state.brandReducer);

  // Доделать превью изображения на onDrop
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-1"></div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700">
                      Название товара
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Тип
                    </label>
                    <select
                      value={typeId.name}
                      onChange={(e) => {
                        let findId = type.find((obj) => obj.name === e.target.value);
                        setTypeId(findId);
                      }}
                      id="type"
                      name="type"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                      {type.map((obj) => (
                        <option key={obj.id}>{obj.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Бренд
                    </label>
                    <select
                      value={brandId.name}
                      onChange={(e) => {
                        let findId = brand.find((obj) => obj.name === e.target.value);
                        setBrandId(findId);
                      }}
                      id="brand"
                      name="brand"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                      {brand.map((obj) => (
                        <option key={obj.id}>{obj.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Описание товара
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={info.description}
                        onChange={(e) => changeInfo('description', e.target.value)}
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Расскажите о товаре..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Преимущества
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={info.highlights}
                        onChange={(e) => changeInfo('highlights', e.target.value)}
                        id="highlights"
                        name="highlights"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Какие преимущества есть у товара?"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Цена
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      type="number"
                      name="price"
                      id="price"
                      autoComplete="off"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 md:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      {file ? (
                        <img alt={file} src={file}></img>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true">
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                              <span>Upload a file</span>
                              <input
                                onChange={selectFile}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
