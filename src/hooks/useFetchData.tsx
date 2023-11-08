import { useQuery } from 'react-query';
import ky from 'ky';
import { IDataBase } from '../types';

interface IFetchDataOptions {
  fetchUrl: string;
  fetchIdentifier: string;
  navUrlPrefix: string;
}

interface IFetchDataArgs {
  options: IFetchDataOptions;
  currentPage: number;
  searchPattern?: string | null;
}

export function useFetchData({
  options,
  currentPage,
  searchPattern,
}: IFetchDataArgs) {
  const fetchUrl = options.fetchUrl;
  const fetchIdentifier = options.fetchIdentifier;

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    [fetchIdentifier, searchPattern ? searchPattern : null, currentPage],
    async () => {
      const res = await ky.get(fetchUrl).json<IDataBase>();
      return res;
    }
  );

  return { data, isLoading, isError };
}
