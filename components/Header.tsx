import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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

const MainContainer = styled.main`
  padding: 1em;
  border: 1px solid white;
  margin-top: 1em;
`;

export default function Header({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { params } = router.query;
  console.log(params);
  return (
    <>
      <SearchContainer>
        <SearchGroup>
          <input size={50} type="search" />
          <button>Search</button>
        </SearchGroup>
        <label>
          Set items per page
          <select>
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
