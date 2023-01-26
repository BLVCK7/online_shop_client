import { $authHost, $host } from './index';

export const getBasket = async (userid) => {
  const { data } = await $host.post('api/basket', userid);
  return data;
};

export const addBasket = async (userid, deviceid) => {
  const { data } = await $host.post('api/basket/add', { userid, deviceid });
  return data;
};

export const deleteBasket = async (userid, deviceid) => {
  const { data } = await $host.post('api/basket/delete', { userid, deviceid });
  return data;
};
