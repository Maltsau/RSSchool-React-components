import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { useAppContext } from '@/context/appContext';
import { ItemsPerPageType } from '@/types';

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  & input,
  select {
    font-size: 25px;
    padding: 0 5px;
  }
  & button {
    cursor: pointer;
    font-size: 20px;
  }
  & label {
    font-size: 25px;
    display: flex;
    gap: 20px;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const SearchButton = styled(Link)`
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 1em;
`;

const MainContainer = styled.main`
  padding: 1em;
  border: 1px solid white;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export default function Header({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { itemsPerPage, setItemsPerPage, searchPattern, setSearchPattern } =
    useAppContext();

  return (
    <>
      <SearchContainer>
        <SearchGroup>
          <input
            size={50}
            type="search"
            placeholder={searchPattern}
            onChange={(e) => {
              setSearchPattern(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                router.push(
                  searchPattern ? `search=${searchPattern}/page=1` : '/page=1'
                );
              }
            }}
          />
          <SearchButton
            href={searchPattern ? `search=${searchPattern}/page=1` : '/page=1'}
          >
            Search
          </SearchButton>
        </SearchGroup>
        <label>
          Set items per page
          <select
            value={itemsPerPage}
            onChange={(e) => {
              router.push(
                searchPattern ? `search=${searchPattern}/page=1` : '/page=1'
              );
              setItemsPerPage(Number(e.target.value) as ItemsPerPageType);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
        <button>Throw Error</button>
      </SearchContainer>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
