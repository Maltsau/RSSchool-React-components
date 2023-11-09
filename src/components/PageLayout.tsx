import styled from 'styled-components';
import { useQuery } from 'react-query';
import ky from 'ky';
import { IDataBase } from '../types';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import NothingFoundMessage from './NothingFoundMessage';

const HorisontalContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const SearchContentContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  padding: 20px;
`;

const CharacterList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  & li {
    border: 1px solid white;
    padding: 15px 10px;
    font-size: 20px;
  }
`;

const PagginationControls = styled.div`
  display: flex;
  gap: 20px;
`;

const PagginationItem = styled.div`
  border-radius: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  border: 1px solid white;
`;

const PagginationButton = styled(Link)<{ $active: boolean }>`
  border-radius: 30px;
  padding: 0 7px;
  display: flex;
  justify-content: center;
  border: 1px solid white;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'auto')};
  border: ${({ $active }) => ($active ? '1px solid white' : '1px solid grey')};
  color: ${({ $active }) => ($active ? 'white' : 'grey')};
`;

export default function PageLayout() {
  const navigate = useNavigate();
  const { search_pattern, page_number } = useParams();
  if (!page_number) {
    navigate('/page=1');
  }
  const currentPage = Number(page_number);

  const options = {
    fetchUrl: search_pattern
      ? `https://swapi.dev/api/people/?search=${search_pattern}&page=${currentPage}`
      : `https://swapi.dev/api/people/?page=${currentPage}`,

    fetchIdentifier: search_pattern ? 'FETCH_DATABASE' : 'FETCH_SEARCH',

    navUrlPrefix: search_pattern ? `/search=${search_pattern}/page=` : `/page=`,
  };

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    [
      options.fetchIdentifier,
      search_pattern ? search_pattern : null,
      currentPage,
    ],
    async () => {
      const res = await ky.get(options.fetchUrl).json<IDataBase>();
      return res;
    }
  );

  const pages = data ? Math.ceil(data.count / 10) : 0;

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
    <HorisontalContainer>
      <SearchContentContainer
        onClick={() => {
          navigate(`${options.navUrlPrefix}${currentPage}`);
        }}
      >
        <CharacterList>
          {data?.results.map((character) => (
            <li
              key={character.name}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link to={`details=${character.url.split('/')[5]}`}>
                {character.name}
              </Link>
            </li>
          ))}
        </CharacterList>
        {pages > 1 ? (
          <PagginationControls>
            <PagginationButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`${options.navUrlPrefix}${
                currentPage > 1 ? currentPage - 1 : 1
              }`}
              $active={currentPage > 1}
            >{`<`}</PagginationButton>
            <PagginationItem>{`${currentPage} of ${pages}`}</PagginationItem>
            <PagginationButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`${options.navUrlPrefix}${
                currentPage < pages ? currentPage + 1 : pages
              }`}
              $active={currentPage < pages}
            >{`>`}</PagginationButton>
          </PagginationControls>
        ) : null}
      </SearchContentContainer>
      <Outlet />
    </HorisontalContainer>
  );
}
