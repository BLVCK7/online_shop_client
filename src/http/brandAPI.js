import { $authHost, $host } from './index';

export const getBrand = async () => {
  const { data } = await $host.get('api/brand');
  return data;
};

export const postBrand = async (name) => {
  const { data } = await $authHost.post('api/brand', { name });
  return data;
};
