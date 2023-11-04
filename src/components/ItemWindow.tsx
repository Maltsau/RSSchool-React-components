import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ICharacter } from '../types';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const ItemContainer = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid white;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
`;

export default function ItemWindow() {
  const { id } = useParams();
  const [isDeatailsVisible, setIsDeatailsVisible] = useState(id ? true : false);

  const { data, isLoading, isError } = useQuery<ICharacter | null, Error>(
    ['FETCH_CHARACTER', id],
    async () => {
      if (id) {
        const res = await ky
          .get(`https://swapi.dev/api/people/${id}/`)
          .json<ICharacter>();
        return res;
      }
      return null;
    }
  );

  useEffect(() => {
    if (id) {
      setIsDeatailsVisible(true);
    }
  }, [id]);

  return (
    <ItemContainer $visible={isDeatailsVisible}>
      {isLoading ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {data && !isLoading && !isError && (
        <>
          <h2>{data.name}</h2>
          <h3>{data.gender}</h3>
        </>
      )}
    </ItemContainer>
  );
}
