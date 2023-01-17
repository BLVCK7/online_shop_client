import React from 'react';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DeviceForm from './modal_forms/DeviceForm';
import SingleForm from './modal_forms/SingleForm';
import { postTypes } from '../http/typeAPI';
import { postBrand } from '../http/brandAPI';
import { postDevices } from '../http/deviceAPI';
import { useSelector } from 'react-redux';
import TableForm from './modal_forms/TableForm';

export default function AdminAddModal({ modal, setModal, nameModal, optionModal }) {
  const cancelButtonRef = useRef(null);
  const { type } = useSelector((state) => state.typeReducer);
  const { brand } = useSelector((state) => state.brandReducer);

  const [newOption, setNewOption] = React.useState('');

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [brandId, setBrandId] = React.useState(brand[0]);
  const [typeId, setTypeId] = React.useState(type[0]);
  const [file, setFile] = React.useState(null);
  const [info, setInfo] = React.useState([]);

  const changeInfo = (key, value) => {
    setInfo({ ...info, [key]: value });
  };

  const onSubmit = () => {
    if (nameModal === 'Добавить категорию') {
      postTypes(newOption);
    } else if (nameModal === 'Добавить бренд') {
      postBrand(newOption);
    } else if (optionModal === 'device') {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', file);
        formData.append('brandId', brandId.id);
        formData.append('typeId', typeId.id);
        formData.append('info', JSON.stringify(Array(info)));
        postDevices(formData);
      } catch (error) {
        alert('Ошибка при создании товара', console.error(error));
      } finally {
        alert('Вы успешно добавили товар');
      }
    }
    setModal(false);
  };

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h1 className="text-center font-bold text-lg">{nameModal}</h1>
                  {optionModal === 'single' ? (
                    <SingleForm newOption={newOption} setNewOption={setNewOption} />
                  ) : optionModal === 'table' ? (
                    <TableForm />
                  ) : (
                    <DeviceForm
                      name={name}
                      setName={setName}
                      price={price}
                      setPrice={setPrice}
                      brandId={brandId}
                      setBrandId={setBrandId}
                      typeId={typeId}
                      setTypeId={setTypeId}
                      file={file}
                      setFile={setFile}
                      info={info}
                      setInfo={setInfo}
                      changeInfo={changeInfo}
                    />
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onSubmit}>
                    Отправить
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModal(false)}
                    ref={cancelButtonRef}>
                    Отмена
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
