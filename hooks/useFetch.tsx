import ky from 'ky';
import { useQuery } from 'react-query';

import { IDataBase, ICharacter, ItemsPerPageType } from '@/types';

interface IFetchPeopleProps {
  fetchIdentifier: string;
  currentPage: number;
  itemsPerPage: ItemsPerPageType;
  searchPattern: string | null;
  fetchUrl: string;
}

interface IFetchPerson {
  details: string;
  fetchUrl: string;
  isDetailsVisible: boolean;
}

function useFetchPeople({
  fetchIdentifier,
  currentPage,
  itemsPerPage,
  searchPattern,
  fetchUrl,
}: IFetchPeopleProps) {
  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    [fetchIdentifier, currentPage, itemsPerPage, searchPattern || null],
    async () => {
      const res = await ky.get(fetchUrl).json<IDataBase>();
      return res;
    }
  );

  return { data, isLoading, isError };
}

function useFetchPerson({ details, fetchUrl, isDetailsVisible }: IFetchPerson) {
  const { data, isLoading, isError } = useQuery<ICharacter, Error>(
    ['FETCH_PERSON', details],
    async () => {
      const res = await ky.get(fetchUrl).json<ICharacter>();
      return res;
    },
    {
      enabled: isDetailsVisible,
    }
  );

  return { data, isLoading, isError };
}

export { useFetchPeople, useFetchPerson };
