import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminDeviceInfoEditThunk } from '../../redux/reducers/DeviceSlice';

export default function EditForm({
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
  const { allDevices, editDevice } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();

  const [deviceName, setDeviceName] = React.useState(allDevices[0].name);

  console.log(editDevice);

  console.log(deviceName);

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="flex justify-between">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Название товара
                    </label>
                    <select
                      onChange={(e) => dispatch(setAdminDeviceInfoEditThunk(e.target.value))}
                      id="deviceName"
                      name="deviceName"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                      {allDevices.map((obj) => (
                        <option value={obj.name} key={obj.id}>
                          {obj.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {editDevice.map((obj) => (
                  <div key={obj.id} className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700">
                        Название товара
                      </label>
                      <input
                        value={obj.name}
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
                        Расскажите о продукте, который вы хотите добавить
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
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Цена
                      </label>
                      <input
                        value={obj.price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type="text"
                        name="price"
                        id="price"
                        autoComplete="off"
                        placeholder="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 md:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Добавить фотографию товара
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                              <span>Нажмите,</span>
                              <input
                                onChange={(e) => setFile(e.target.files[0])}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">чтобы загрузить файл</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG до 10MB</p>
                        </div>
                      </div>

                      {file && (
                        <div className="mt-3">
                          <span className="font-bold">Загруженные файлы</span>
                          <div className="flex justify-start items-center">
                            <svg
                              fill="none"
                              viewBox="0 0 15 15"
                              height="2em"
                              width="2em"
                              className="mr-3">
                              <path
                                fill="green"
                                d="M2.5 6.5V6H2v.5h.5zm8 4H10v.5h.5v-.5zm2 0v.5h.5v-.5h-.5zm1-7h.5v-.207l-.146-.147-.354.354zm-3-3l.354-.354L10.707 0H10.5v.5zm-4 6l.447-.224L6 6.5h.5zm-.5 4v.5h1v-.5H6zm2.5 0l-.447.224A.5.5 0 009 10.5h-.5zm.5-4V6H8v.5h1zM2.5 7h1V6h-1v1zm.5 4V8.5H2V11h1zm0-2.5v-2H2v2h1zm.5-.5h-1v1h1V8zm.5-.5a.5.5 0 01-.5.5v1A1.5 1.5 0 005 7.5H4zM3.5 7a.5.5 0 01.5.5h1A1.5 1.5 0 003.5 6v1zM10 6v4.5h1V6h-1zm.5 5h2v-1h-2v1zm2.5-.5v-2h-1v2h1zM10.5 7H13V6h-2.5v1zM2 5V1.5H1V5h1zm11-1.5V5h1V3.5h-1zM2.5 1h8V0h-8v1zm7.646-.146l3 3 .708-.708-3-3-.708.708zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1zM1 12v1.5h1V12H1zm1.5 3h10v-1h-10v1zM14 13.5V12h-1v1.5h1zM12.5 15a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM1 13.5A1.5 1.5 0 002.5 15v-1a.5.5 0 01-.5-.5H1zm5-7v4h1v-4H6zm.053.224l2 4 .894-.448-2-4-.894.448zM8 6.5v4h1v-4H8z"
                              />
                            </svg>
                            <div className="flex flex-col">
                              <p>
                                {file.name.length > 15 ? file.name.slice(0, 15) + '...' : file.name}
                              </p>
                              <p>{file.size + 'B'}</p>
                            </div>
                            <div className="ml-auto cursor-pointer" onClick={() => setFile(null)}>
                              <svg viewBox="0 0 470 1000" fill="red" height="1.5em" width="1.5em">
                                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
