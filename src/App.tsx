import React, { Component } from 'react';
import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';

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
  pages: number;
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

const ContentContainer = styled.div`
  width: 100%;
  min-height: 500px;
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

const PagginationItem = styled.div`
  border-radius: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  border: 1px solid white;
`;

const PagginationButton = styled(PagginationItem)<{ $active: boolean }>`
  padding: 0 7px;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'auto')};
  border: ${({ $active }) => ($active ? '1px solid white' : '1px solid grey')};
  color: ${({ $active }) => ($active ? 'white' : 'grey')};
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
      pages: 1,
    };
    this.fetchData(this.masterUrl);
  }

  private masterUrl = 'https://swapi.dev/api/people/';

  private previousSearch = (localStorage.getItem('previousSearch') !== null
    ? localStorage.getItem('previousSearch')
    : '') as string;

  private fetchData(url: string, direction?: -1 | 1) {
    this.setState({ isLoading: true, isError: false });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          characters: data.results,
          isLoading: false,
          currentPage: direction
            ? prevState.currentPage + direction
            : prevState.currentPage,
          previous: data.previous,
          next: data.next,
          pages: Math.ceil(data.count / 10),
        }));
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  private handleSearchChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({ searcInput: target.value });
  };

  private handleSearch() {
    this.fetchData(`${this.masterUrl}?search=${this.state.searcInput}`);
    localStorage.setItem('previousSearch', this.state.searcInput);
  }

  private throwError = () => {
    try {
      throw new Error('This is a manually triggered error');
    } catch {
      this.setState({ isError: true });
      throw new Error('This is a manually triggered error');
    }
  };

  render() {
    const {
      characters,
      searcInput,
      isLoading,
      isError,
      currentPage,
      previous,
      next,
      pages,
    } = this.state;
    return (
      <>
        {isError ? (
          <ErrorMessage />
        ) : (
          <ErrorBoundary>
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
                <button
                  onClick={() => {
                    this.throwError();
                  }}
                >
                  Throw Error
                </button>
              </SearchContainer>
              <ContentContainer>
                {isError ? (
                  <ErrorMessage />
                ) : isLoading ? (
                  <Loader />
                ) : characters.length ? (
                  <>
                    <CharacterList>
                      {characters.map((character) => (
                        <li key={character.name}>{character.name}</li>
                      ))}
                    </CharacterList>
                    {next || previous ? (
                      isLoading ? null : (
                        <PagginationControls>
                          <PagginationButton
                            $active={!!previous}
                            onClick={() => {
                              if (previous) {
                                this.fetchData(previous, -1);
                              }
                            }}
                          >{`<`}</PagginationButton>
                          <PagginationItem>{`${currentPage} of ${pages}`}</PagginationItem>
                          <PagginationButton
                            $active={!!next}
                            onClick={() => {
                              if (next) {
                                this.fetchData(next, +1);
                              }
                            }}
                          >{`>`}</PagginationButton>
                        </PagginationControls>
                      )
                    ) : null}
                  </>
                ) : (
                  <NothingFoundMessage />
                )}
              </ContentContainer>
            </Wrapper>
          </ErrorBoundary>
        )}
      </>
    );
  }
}

export default App;
