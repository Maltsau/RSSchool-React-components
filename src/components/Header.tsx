// import React, { useState } from 'react';
import styled from 'styled-components';

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

export default function Header() {
  //   const [previousSearch, setPreviousSearch] = useState<string>(
  //     localStorage.getItem('previousSearch') || ''
  //   );
  //   const [searchInput, setSearchInput] = useState<string>('');
  //   const [hasError, setHasError] = useState<boolean>(false);

  //   const handleSearchChange = (e: React.SyntheticEvent) => {
  //     const target = e.target as HTMLInputElement;
  //     setSearchInput(target.value);
  //     localStorage.setItem('previousSearch', searchInput);
  //     setPreviousSearch(searchInput);
  //     onInputChange(target.value);
  //   };

  //   const handleSearch = () => {};

  const throwError = () => {
    //   setHasError(true);
    throw new Error('This is a manually triggered error');
  };
  return (
    <SearchContainer>
      <input
        placeholder={''}
        size={50}
        type="search"
        value={''}
        onChange={
          (/* e */) => {
            /* handleSearchChange(e); */
          }
        }
      />
      <button
        onClick={() => {
          /* handleSearch(); */
        }}
      >
        Search
      </button>
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
