import styled from 'styled-components';
import { useEffect } from 'react';
import ky from 'ky';
import { /* useParams */ useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ICharacter } from '../types';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const ItemContainer = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid white;
`;

export default function ItemWindow() {
  const { item_name } = useParams();
  const url = useOutletContext() as string;
  const { data, isLoading, isError, refetch } = useQuery<ICharacter, Error>(
    'FETCH_CHERACTER',
    async () => {
      const res = await ky.get(url).json<ICharacter>();
      return res;
    }
  );

  useEffect(() => {
    refetch();
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <ErrorMessage />;
  }

  return (
    <ItemContainer $visible={!!item_name}>
      <h2>{data.name}</h2>
      <h3>{data.gender}</h3>
    </ItemContainer>
  );
}
