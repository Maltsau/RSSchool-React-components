import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ky from 'ky';
import { useQuery } from 'react-query';
import Link from 'next/link';

import { IDataBase } from '@/types';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import NothingFoundMessage from '@/components/NothingFoundMessage';
import CharacterWindow from '@/components/CharacterWindow';

import { pathHasParam, findAnyParam, replacePathParam } from '@/utils/utils';
import { useAppContext } from '@/context/appContext';
import { ICharacter } from '@/types';

const HorisontalContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const ResultList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  & li {
    border: 1px solid white;
    padding: 15px 10px;
    font-size: 20px;
  }
`;

const PagginationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PagginationItem = styled.div`
  font-size: 20px;
  border-radius: 20px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const PagginationButton = styled(Link)<{ $active: boolean }>`
  border-radius: 30px;
  padding: 0 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'auto')};
  border: ${({ $active }) => ($active ? '1px solid white' : '1px solid grey')};
  color: ${({ $active }) => ($active ? 'white' : 'grey')};
`;

export default () => {
  const router = useRouter();
  const { params } = router.query;
  const { itemsPerPage } = useAppContext();

  const currentPage = Number(findAnyParam(params, 'page'));
  const searchPattern = findAnyParam(params, 'search');
  const hasDetails = pathHasParam(params, 'details');

  const options = {
    fetchUrl: searchPattern
      ? `https://swapi.dev/api/people/?search=${searchPattern}&page=${currentPage}`
      : `https://swapi.dev/api/people/?page=${currentPage}`,
    fetchIdentifier: searchPattern ? 'FETCH_PEOPLE' : 'FETCH_SEARCH',
    paggination: {
      increasePath: hasDetails
        ? replacePathParam(
            replacePathParam(router.asPath, 'details', ``),
            'page',
            `page=${currentPage + 1}`
          )
        : replacePathParam(router.asPath, 'page', `page=${currentPage + 1}`),
      decreasePath: hasDetails
        ? replacePathParam(
            replacePathParam(router.asPath, 'details', ``),
            'page',
            `page=${currentPage - 1}`
          )
        : replacePathParam(router.asPath, 'page', `page=${currentPage - 1}`),
    },
  };

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    [options.fetchIdentifier, currentPage, searchPattern || null],
    async () => {
      const res = await ky.get(options.fetchUrl).json<IDataBase>();
      return res;
    }
  );
  const pages = data ? Math.ceil(data.count / itemsPerPage) : 0;
  let outputArr: ICharacter[] | [] = [];

  if (itemsPerPage === 10) {
    outputArr = data?.results as ICharacter[];
  } else {
    if (currentPage % 2) {
      outputArr = data?.results.slice(0, 5) as ICharacter[];
    } else {
      outputArr = data?.results.slice(5) as ICharacter[];
    }
  }
  console.log(
    'path',
    router.asPath,
    replacePathParam(router.asPath, 'page', `page=${currentPage + 1}`)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <ErrorMessage />;
  }

  if (!data.results.length) {
    return <NothingFoundMessage />;
  }

  return (
    <>
      <HorisontalContainer>
        <ResultList>
          {outputArr.map((character) => {
            return (
              <li key={character.name}>
                <Link
                  href={
                    pathHasParam(params, 'details')
                      ? `${[
                          ...router.asPath
                            .split('/')
                            .filter((item, pos, arr) => pos !== arr.length - 1),
                          `/details=${character.url.split('/')[5]}`,
                        ].join('')}`
                      : `${router.asPath}/details=${
                          character.url.split('/')[5]
                        }`
                  }
                >
                  {character.name}
                </Link>
              </li>
            );
          })}
        </ResultList>
        <CharacterWindow />
      </HorisontalContainer>
      {pages > 1 ? (
        <PagginationControls>
          <PagginationButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={
              currentPage !== 1
                ? options.paggination.decreasePath
                : router.asPath
            }
            $active={currentPage > 1}
          >{`<`}</PagginationButton>
          <PagginationItem>{`${currentPage} of ${pages}`}</PagginationItem>
          <PagginationButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={
              currentPage !== pages
                ? options.paggination.increasePath
                : router.asPath
            }
            $active={currentPage < pages}
          >{`>`}</PagginationButton>
        </PagginationControls>
      ) : null}
    </>
  );
};
