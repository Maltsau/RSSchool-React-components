import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDataBase } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<IDataBase, { page?: number; search?: string }>({
      query: ({ page = 1, search = '' }) =>
        `people/?page=${page}&search=${search}`,
    }),
  }),
});

export const { useGetPeopleQuery } = api;

export default api;
