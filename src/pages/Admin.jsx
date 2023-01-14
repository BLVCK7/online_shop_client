import React from 'react';

const Admin = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-5 ">
      <h1 className="text-3xl text-indigo-600 font-bold drop-shadow-md ">Админ панель</h1>
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        <button className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm">
          Добавить девайс
        </button>
        <button className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm">
          Добавить бренд
        </button>
        <button className="p-3 w-fit rounded-xl bg-indigo-600 text-gray-50 drop-shadow-sm">
          Добавить категорию
        </button>
      </div>
    </div>
  );
};

export default Admin;
