import styled from 'styled-components';
import { useQuery } from 'react-query';
import ky from 'ky';
import { IDataBase } from '../types';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

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
  const { page_number } = useParams();
  const currentPage = Number(page_number);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    ['FETCH_DATABASE', currentPage],
    async () => {
      const res = await ky
        .get(`https://swapi.dev/api/people/?page=${currentPage}`)
        .json<IDataBase>();
      return res;
    }
  );

  const pages = data ? Math.ceil(data.count / 10) : 0;
  console.log(
    'currentPage',
    currentPage,
    'next',
    `/page=${currentPage < pages ? currentPage + 1 : pages}`
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <ErrorMessage />;
  }

  return (
    <HorisontalContainer>
      <SearchContentContainer
        onClick={() => {
          navigate(`/page=${currentPage}`);
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
        {currentPage ? (
          <PagginationControls>
            <PagginationButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`/page=${currentPage > 1 ? currentPage - 1 : 1}`}
              $active={currentPage > 1}
            >{`<`}</PagginationButton>
            <PagginationItem>{`${currentPage} of ${pages}`}</PagginationItem>
            <PagginationButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`/page=${currentPage < pages ? currentPage + 1 : pages}`}
              $active={currentPage < pages}
            >{`>`}</PagginationButton>
          </PagginationControls>
        ) : null}
      </SearchContentContainer>
      <Outlet />
    </HorisontalContainer>
  );
}
