import { $authHost, $host } from './index';

export const getDevices = async () => {
  const { data } = await $host.get('api/device');
  return data;
};

export const postDevices = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const getOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};
