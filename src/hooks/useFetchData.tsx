import ky from 'ky';
import { useQuery, UseQueryResult } from 'react-query';
import { IDataBase } from '../types';

export default function useFetchData(url: string): UseQueryResult<IDataBase> {
  return useQuery('FETCH_DATA', async () => {
    const res = await ky.get(url);
    return await res.json();
  });
}
