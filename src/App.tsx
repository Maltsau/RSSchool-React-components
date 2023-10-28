import React, { Component } from 'react';
import styled from 'styled-components';

import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NothingFoundMessage from './components/NothingFoundMessage';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface State {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  searcInput: string;
  currentPage: number;
  previous: string | null;
  next: string | null;
}

const Wrapper = styled.main`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

const SearchContainer = styled.div`
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
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CharacterList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  & li {
    border: 1px solid white;
    padding: 15px 10px;
    font-size: 20px;
  }
`;

const PagginationControls = styled.div`
  display: flex;
  gap: 20px;
`;

const PagginationButton = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'auto')};
  border: ${({ isActive }) =>
    isActive ? '1px solid white' : '1px solid grey'};
  color: ${({ isActive }) => (isActive ? 'white' : 'grey')};
  border-radius: 30px;
  padding: 0 7px;
  display: flex;
  justify-content: center;
`;

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      isError: false,
      searcInput: '',
      currentPage: 1,
      previous: null,
      next: null,
    };
  }

  masterUrl = 'https://swapi.dev/api/people/';
  previousSearch = (localStorage.getItem('previousSearch') !== null
    ? localStorage.getItem('previousSearch')
    : '') as string;

  componentDidMount() {
    fetch(this.masterUrl)
      .then((response) => response.json())
      .then(
        (data: {
          results: Character[];
          previous: string | null;
          next: string | null;
        }) =>
          this.setState({
            characters: data.results,
            isLoading: false,
            previous: data.previous,
            next: data.next,
          })
      )
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  turnPage = (url: string, direction: -1 | 1) => {
    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => response.json())
      .then(
        (data: {
          results: Character[];
          previous: string | null;
          next: string | null;
        }) =>
          this.setState({
            characters: data.results,
            isLoading: false,
            currentPage: this.state.currentPage + direction,
            previous: data.previous,
            next: data.next,
          })
      )
      .catch(() => {
        this.setState({ isError: true });
      });
  };

  handleSearchChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({ searcInput: target.value });
  };

  handleSearch() {
    this.setState({ isLoading: true });
    fetch(`${this.masterUrl}?search=${this.state.searcInput}`)
      .then((response) => response.json())
      .then(
        (data: {
          results: Character[];
          previous: string | null;
          next: string | null;
        }) => {
          this.setState({
            characters: data.results,
            isLoading: false,
            currentPage: 1,
            previous: data.previous,
            next: data.next,
          });
          localStorage.setItem('previousSearch', this.state.searcInput);
        }
      )
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    const {
      characters,
      searcInput,
      isLoading,
      isError,
      currentPage,
      previous,
      next,
    } = this.state;
    return (
      <Wrapper>
        <SearchContainer>
          <input
            placeholder={this.previousSearch}
            size={50}
            type="search"
            value={searcInput}
            onChange={this.handleSearchChange}
          />
          <button
            onClick={() => {
              this.handleSearch();
            }}
          >
            Search
          </button>
        </SearchContainer>
        <ContentContainer>
          {isError ? (
            <ErrorMessage />
          ) : isLoading ? (
            <Loader />
          ) : characters.length ? (
            <CharacterList>
              {characters.map((character, index) => (
                <li key={index}>{character.name}</li>
              ))}
            </CharacterList>
          ) : (
            <NothingFoundMessage />
          )}
          {next || previous ? (
            isLoading ? null : (
              <PagginationControls>
                <PagginationButton
                  isActive={!!previous}
                  onClick={() => {
                    if (previous) {
                      this.turnPage(previous, -1);
                    }
                  }}
                >{`<`}</PagginationButton>
                <PagginationButton isActive>{currentPage}</PagginationButton>
                <PagginationButton
                  isActive={!!next}
                  onClick={() => {
                    if (next) {
                      this.turnPage(next, +1);
                    }
                  }}
                >{`>`}</PagginationButton>
              </PagginationControls>
            )
          ) : null}
        </ContentContainer>
      </Wrapper>
    );
  }
}

export default App;
