import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemsPerPageType } from '../types';
import { setItemsPerPage } from '../store/itemsPerPageSlice';
import { setSearchPattern } from '../store/searchPatternSlice';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

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

export default function Header() {
  const navigate = useNavigate();
  const { search_pattern } = useParams();
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.value);
  const searchPattern = useAppSelector((state) => state.searchPattern.value);
  const dispatch = useDispatch();

  const directionOnSearch = searchPattern
    ? `/search=${searchPattern}/page=1`
    : `/page=1`;

  useEffect(() => {
    if (search_pattern) {
      dispatch(setSearchPattern(search_pattern));
    }
  }, [dispatch, search_pattern]);

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
            dispatch(setSearchPattern(e.target.value));
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              localStorage.setItem('searchPattern', searchPattern);
              navigate(directionOnSearch);
            }
          }}
        />
        <button
          onClick={() => {
            localStorage.setItem('searchPattern', searchPattern);
            navigate(directionOnSearch);
          }}
        >
          Search
        </button>
      </SearchGroup>
      <label>
        Set items per page
        <select
          defaultValue={itemsPerPage}
          onChange={(e) => {
            dispatch(
              setItemsPerPage(Number(e.target.value) as ItemsPerPageType)
            );
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
