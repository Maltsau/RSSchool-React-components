import React from 'react';
import { useRouter } from 'next/router';
import ky from 'ky';
import { useQuery } from 'react-query';

import { IDataBase } from '@/types';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import styled from 'styled-components';

const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  & li {
    border: 1px solid white;
    padding: 15px 10px;
    font-size: 20px;
  }
`;

export default () => {
  const router = useRouter();
  const { params } = router.query;
  console.log(params);

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    ['FETCH_DATABASE'],
    async () => {
      const res = await ky
        .get('https://swapi.dev/api/people/')
        .json<IDataBase>();
      return res;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <ErrorMessage />;
  }

  return (
    <ResultList>
      {data.results.map((item) => {
        return <li key={item.name}>{item.name}</li>;
      })}
    </ResultList>
  );
};
