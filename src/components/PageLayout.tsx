import styled from 'styled-components';
import { useQuery } from 'react-query';
import ky from 'ky';
import { Outlet } from 'react-router-dom';
import { IDataBase } from '../types';
import { Link } from 'react-router-dom';

const HorisontalContainer = styled.div`
  display: flex;
`;

const SearchContentContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const fetchDBData = async () => {
  const res = await ky.get('https://swapi.dev/api/people/').json<IDataBase>();
  return res;
};

export default function PageLayout() {
  const {
    data: DB,
    isLoading,
    isError,
  } = useQuery<IDataBase, Error>('database', fetchDBData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !DB) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <HorisontalContainer>
        <SearchContentContainer>
          <CharacterList>
            {DB?.results.map((character) => (
              <li key={character.name}>
                <Link to={`/details`}>{character.name}</Link>
              </li>
            ))}
          </CharacterList>
        </SearchContentContainer>
        <Outlet />
      </HorisontalContainer>
    </>
  );
}
