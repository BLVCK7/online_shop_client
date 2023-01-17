import React from 'react';

export default function SingleForm({ newOption, setNewOption }) {
  return (
    <>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-12 gap-7">
            <div className="col-span-11">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Название
              </label>
              <input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
