import { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  & input {
    font-size: 25px;
    padding: 0 5px;
  }
  & button {
    cursor: pointer;
    font-size: 20px;
  }
  & button:nth-child(3) {
    margin-left: auto;
  }
`;

const SubmitButton = styled(Link)`
  font-size: 20px;
`;

export default function Header() {
  const { search_pattern } = useParams();
  const [searchPattern, setSearchPattern] = useState('');
  const directionOnSearch = searchPattern
    ? `/search=${searchPattern}/page=1`
    : `/page=1`;

  const throwError = () => {
    throw new Error('This is a manually triggered error');
  };
  console.log(searchPattern);
  return (
    <SearchContainer>
      <input
        size={50}
        type="search"
        placeholder={search_pattern ? search_pattern : ''}
        onChange={(e) => {
          setSearchPattern(e.target.value);
        }}
      />
      <SubmitButton to={directionOnSearch}>Search</SubmitButton>
      <button
        onClick={() => {
          throwError();
        }}
      >
        Throw Error
      </button>
    </SearchContainer>
  );
}
