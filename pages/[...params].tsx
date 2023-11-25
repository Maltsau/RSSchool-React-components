import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ky from 'ky';
import { useQuery } from 'react-query';
import Link from 'next/link';

import { IDataBase } from '@/types';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import CharacterWindow from '@/components/CharacterWindow';

import { pathHasDetails } from '@/utils/utils';

const ResultList = styled.ul`
  width: 100%;
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
  console.log('router', router);

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    ['FETCH_PEOPLE'],
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
    <>
      <ResultList>
        {data.results.map((character) => {
          return (
            <li key={character.name}>
              <Link
                href={
                  pathHasDetails(params)
                    ? `${[
                        ...router.asPath
                          .split('/')
                          .filter((item, pos, arr) => pos !== arr.length - 1),
                        `/details=${character.url.split('/')[5]}`,
                      ].join('')}`
                    : `${router.asPath}/details=${character.url.split('/')[5]}`
                }
              >
                {character.name}
              </Link>
            </li>
          );
        })}
      </ResultList>
      <CharacterWindow />
    </>
  );
};
