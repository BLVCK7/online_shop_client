import React from 'react';
import { useDispatch } from 'react-redux';
import AdminAddModal from '../components/AdminAddModal';
import { setAllUsersThunk } from '../redux/reducers/UserSlice';

const Admin = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = React.useState(false);
  const [nameModal, setNameModal] = React.useState('');
  const [optionModal, setOptionModal] = React.useState('');
  const onClickModal = ({ name, option }) => {
    setModal((prev) => !prev);
    setNameModal(name);
    setOptionModal(option);
  };

  const onClickGetUsers = ({ name, option }) => {
    dispatch(setAllUsersThunk());
    setModal((prev) => !prev);
    setNameModal(name);
    setOptionModal(option);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AdminAddModal
        modal={modal}
        setModal={setModal}
        nameModal={nameModal}
        optionModal={optionModal}
      />
      <h1 className="text-center font-bold text-black text-2xl my-10">Админ панель</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <button
          className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm"
          onClick={() => onClickModal({ name: 'Добавить товар', option: 'device' })}>
          Добавить товар
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
        <button
          className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm"
          onClick={() => onClickGetUsers({ name: 'Получить пользователей', option: 'table' })}>
          Получить список пользователей
        </button>
      </div>
    </div>
  );
};

export default Admin;
