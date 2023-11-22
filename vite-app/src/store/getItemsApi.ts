// getItemsApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDataBase, ICharacter } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      IDataBase,
      { page?: number; search?: string; id?: string }
    >({
      query: ({ page = 1, search = '', id }) =>
        id ? `people/${id}/` : `people/?page=${page}&search=${search}`,
    }),
    getPerson: builder.query<ICharacter, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = api;

export default api;
