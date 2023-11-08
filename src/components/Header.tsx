import { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppContext, ItemsPerPageType } from '../context/AppContext';

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

const SubmitButton = styled(Link)`
  font-size: 20px;
  background-color: white;
  color: #242424;
  padding-block: 1px;
  padding-inline: 6px;
`;

export default function Header() {
  const { itemsPerPage, setItemsPerPage } = useAppContext();
  const navigate = useNavigate();
  const { search_pattern } = useParams();
  const [searchPattern, setSearchPattern] = useState('');
  const directionOnSearch = searchPattern
    ? `/search=${searchPattern}/page=1`
    : `/page=1`;

  const throwError = () => {
    throw new Error('This is a manually triggered error');
  };

  return (
    <SearchContainer>
      <SearchGroup>
        <input
          size={50}
          type="search"
          placeholder={search_pattern ? search_pattern : ''}
          onChange={(e) => {
            setSearchPattern(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              navigate(directionOnSearch);
            }
          }}
        />
        <SubmitButton to={directionOnSearch}>Search</SubmitButton>
      </SearchGroup>
      <label>
        Set items per page
        <select
          defaultValue={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value) as ItemsPerPageType);
            navigate(`/page=1`);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </label>
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
