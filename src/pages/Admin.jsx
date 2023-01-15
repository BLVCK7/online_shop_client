import React from 'react';
import Modal from '../components/Modal';

const Admin = () => {
  const [modal, setModal] = React.useState(false);
  const [nameModal, setNameModal] = React.useState('');
  const [optionModal, setOptionModal] = React.useState('');
  const onClickModal = ({ name, option }) => {
    setModal((prev) => !prev);
    setNameModal(name);
    setOptionModal(option);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 ">
      <Modal modal={modal} setModal={setModal} nameModal={nameModal} optionModal={optionModal} />
      <h1 className="text-3xl text-indigo-600 font-bold drop-shadow-md ">Админ панель</h1>
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        <button
          className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm"
          onClick={() => onClickModal({ name: 'Добавить девайс', option: 'device' })}>
          Добавить девайс
        </button>
        <button
          className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm"
          onClick={() => onClickModal({ name: 'Добавить бренд', option: 'single' })}>
          Добавить бренд
        </button>
        <button
          className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm"
          onClick={() => onClickModal({ name: 'Добавить категорию', option: 'single' })}>
          Добавить категорию
        </button>
      </div>
    </div>
  );
};

export default Admin;
