import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ky from 'ky';
import { IDataBase } from '../types';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';

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

/* const fetchDBData = async () => {
  const res = await ky.get('https://swapi.dev/api/people/').json<IDataBase>();
  return res;
}; */

export default function PageLayout() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  //   const [isItemWindowVisible, setIsItemWindowVisible] =
  //     useState<boolean>(false);
  const params = useParams();
  console.log('params', params);
  const { data, isLoading, isError } = useQuery<IDataBase, Error>(
    'FETCH_DATABASE',
    async () => {
      const res = await ky
        .get('https://swapi.dev/api/people/')
        .json<IDataBase>();
      return res;
    }
  );
  console.log('data', data);

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
          navigate('/page=1');
        }}
      >
        <CharacterList>
          {data?.results.map((character) => (
            <li
              key={character.name}
              onClick={(e) => {
                e.stopPropagation();
                console.log('url', character.url);
                setActiveItem(character.url);
              }}
            >
              <Link
                to={`details=${character.name
                  .replaceAll(' ', '')
                  .toLowerCase()}`}
              >
                {character.name}
              </Link>
            </li>
          ))}
        </CharacterList>
      </SearchContentContainer>
      <Outlet context={activeItem} />
    </HorisontalContainer>
  );
}
