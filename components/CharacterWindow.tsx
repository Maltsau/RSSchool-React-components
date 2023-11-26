import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pathHasParam } from '@/utils/utils';
import { useQuery } from 'react-query';
import ky from 'ky';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { ICharacter } from '@/types';
import { findAnyParam } from '@/utils/utils';

const ItemContainer = styled.div<{ $visible: boolean }>`
  position: relative;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid white;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  & h2 {
    font-size: 30px;
  }
  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`;

const CloseIcon = styled(Link)`
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 30px;
  & div:first-child {
    transform: rotate(45deg) translateX(14%);
  }
  & div:nth-child(2) {
    border-bottom: 2px solid black;
    transform: rotate(-45deg) translateX(10%);
  }
`;

const CloseIconLine = styled.div`
  width: 30px;
  height: 4px;
  background-color: white;
`;

const DescriptionRow = styled.li`
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DottedSpace = styled.div`
  flex: 1 0;
  border-bottom: 1px dotted white;
  height: 1em;
  margin: 0 0.4em;
`;

export default function CharacterWindow() {
  const router = useRouter();
  const { params } = router.query;

  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(
    pathHasParam(params, 'details')
  );

  useEffect(() => {
    setIsDetailsVisible(pathHasParam(params, 'details'));
  }, [params]);

  const formFetchUrl = () => {
    const detailsParam = findAnyParam(params, 'details');
    if (detailsParam) {
      return `https://swapi.dev/api/people/${detailsParam}`;
    }
    return '';
  };

  const { data, isLoading, isError } = useQuery<ICharacter, Error>(
    ['FETCH_PERSON', findAnyParam(params, 'details')],
    async () => {
      const res = await ky.get(formFetchUrl()).json<ICharacter>();
      return res;
    },
    {
      enabled: isDetailsVisible,
    }
  );

  return (
    <ItemContainer $visible={isDetailsVisible}>
      <CloseIcon href={`${router.asPath.split('/').slice(0, -1).join('/')}`}>
        <CloseIconLine />
        <CloseIconLine />
      </CloseIcon>
      {isLoading ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {data && !isLoading && !isError && (
        <>
          <h2>{data.name}</h2>
          <ul>
            <DescriptionRow>
              <span>Gender</span>
              <DottedSpace></DottedSpace>
              <span>{data.gender}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Year of birth</span>
              <DottedSpace></DottedSpace>
              <span>{data.birth_year}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Height, cm</span>
              <DottedSpace></DottedSpace>
              <span>{data.height}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Mass, kg</span>
              <DottedSpace></DottedSpace>
              <span>{data.mass}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Skin color</span>
              <DottedSpace></DottedSpace>
              <span>{data.skin_color}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Eye color</span>
              <DottedSpace></DottedSpace>
              <span>{data.eye_color}</span>
            </DescriptionRow>
            <DescriptionRow>
              <span>Hair color</span>
              <DottedSpace></DottedSpace>
              <span>{data.hair_color}</span>
            </DescriptionRow>
          </ul>
        </>
      )}
    </ItemContainer>
  );
}
