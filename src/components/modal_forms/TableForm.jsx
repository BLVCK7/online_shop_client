import React from 'react';
import { useSelector } from 'react-redux';

export default function TableForm() {
  const { allUsers, status } = useSelector((state) => state.userReducer);

  console.log(allUsers.users);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="flex justify-between bg-white px- py-5 sm:p-6 ">
          <div>
            <h1>id</h1>
            {allUsers.users.map((user) => (
              <div key={user.id} className="flex flex-col">
                <span>{user.id}</span>
              </div>
            ))}
          </div>
          <div>
            <h1>email</h1>
            {allUsers.users.map((user) => (
              <div key={user.id} className="flex flex-col">
                <span>{user.email}</span>
              </div>
            ))}
          </div>
          <div>
            <h1>role</h1>
            {allUsers.users.map((user) => (
              <div key={user.id} className="flex flex-col">
                <span>{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
