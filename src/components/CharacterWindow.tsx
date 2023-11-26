import styled from 'styled-components';
import { useEffect, useState } from 'react';
// import ky from 'ky';
import { useParams, Link, useLocation } from 'react-router-dom';
// import { useQuery } from 'react-query';
import { useGetPersonQuery } from '../store/getItemsApi';
// import { ICharacter } from '../types';

import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

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

const DescriptionRow = styled.div`
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
  const location = useLocation();
  const { id } = useParams();
  const [isDeatailsVisible, setIsDeatailsVisible] = useState(id ? true : false);

  // const { data, isLoading, isError } = useQuery<ICharacter | null, Error>(
  //   ['FETCH_CHARACTER', id],
  //   async () => {
  //     if (id) {
  //       const res = await ky
  //         .get(`https://swapi.dev/api/people/${id}/`)
  //         .json<ICharacter>();
  //       return res;
  //     }
  //     return null;
  //   }
  // );

  const { data, isFetching, isError } = useGetPersonQuery(id || '');
  useEffect(() => {
    if (id) {
      setIsDeatailsVisible(true);
    }
  }, [id]);
  return (
    <ItemContainer $visible={isDeatailsVisible}>
      <CloseIcon to={`${location.pathname.split('/').slice(0, -1).join('/')}`}>
        <CloseIconLine />
        <CloseIconLine />
      </CloseIcon>
      {isFetching ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {data && !isFetching && !isError && (
        <>
          <h2>{data.name}</h2>
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
        </>
      )}
    </ItemContainer>
  );
}
