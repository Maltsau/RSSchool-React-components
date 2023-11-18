import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext, ItemsPerPageType } from '../context/AppContext';
import { setItemsPerPage as setItemsPerPage2 } from '../store/itemsPerPageSlice';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';

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
  const { itemsPerPage, setItemsPerPage } = useAppContext();
  const navigate = useNavigate();
  const { search_pattern } = useParams();
  const { searchPattern, setSearchPattern } = useAppContext();
  const directionOnSearch = searchPattern
    ? `/search=${searchPattern}/page=1`
    : `/page=1`;

  const throwError = () => {
    throw new Error('This is a manually triggered error');
  };

  const itemsPerPage2 = useAppSelector((state) => state.itemsPerPage.value);
  const dispatch = useDispatch();

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
            setItemsPerPage(Number(e.target.value) as ItemsPerPageType);
            dispatch(
              setItemsPerPage2(Number(e.target.value) as ItemsPerPageType)
            );
            setItemsPerPage2(Number(e.target.value) as ItemsPerPageType);
            navigate(`/page=1`);
            console.log(itemsPerPage2);
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
