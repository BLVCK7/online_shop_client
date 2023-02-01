// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL + 'api/' }),
  endpoints: (builder) => ({
    getBrandedDevices: builder.query({
      query: (search) => `device${search}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBrandedDevicesQuery } = applicationApi;
