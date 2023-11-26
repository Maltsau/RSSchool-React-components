import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import NothingFoundMessage from '@/components/NothingFoundMessage';
import CharacterWindow from '@/components/CharacterWindow';

import { useFetchPeople } from '@/hooks/useFetch';
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

export default function HomePage() {
  const router = useRouter();
  const { params } = router.query;
  const { itemsPerPage } = useAppContext();

  const currentPage = Number(findAnyParam(params, 'page'));
  const searchPattern = findAnyParam(params, 'search');
  const hasDetails = pathHasParam(params, 'details');

  const setFetchUrl = () => {
    const baseApiUrl = 'https://swapi.dev/api/people/';
    const pageModifier =
      itemsPerPage === 5 ? Math.ceil(currentPage / 2) : currentPage;

    return searchPattern
      ? `${baseApiUrl}?search=${searchPattern}&page=${pageModifier}`
      : `${baseApiUrl}?page=${pageModifier}`;
  };

  const options = {
    fetchUrl: setFetchUrl(),
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

  const { data, isLoading, isError } = useFetchPeople({
    fetchIdentifier: options.fetchIdentifier,
    currentPage,
    itemsPerPage,
    searchPattern: searchPattern || null,
    fetchUrl: options.fetchUrl,
  });
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
                      ? replacePathParam(
                          router.asPath,
                          'details',
                          `details=${character.url.split('/')[5]}`
                        )
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
}
