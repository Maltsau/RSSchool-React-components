import React, { Component } from 'react';
import styled from 'styled-components';

import Loader from './components/Loader';

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
  searcInput: string;
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
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      searcInput: '',
    };
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data: { results: Character[] }) =>
        this.setState({ characters: data.results, isLoading: false })
      );
  }

  handleSearchChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({ searcInput: target.value });
  };

  handleSearch() {
    this.setState({ isLoading: true });
    fetch(`https://swapi.dev/api/people/?search=${this.state.searcInput}`)
      .then((response) => response.json())
      .then((data: { results: Character[] }) =>
        this.setState({ characters: data.results, isLoading: false })
      );
  }

  render() {
    const { characters, searcInput, isLoading } = this.state;
    console.log(this.state.characters);
    return (
      <Wrapper>
        <SearchContainer>
          <input
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
          {isLoading ? (
            <Loader />
          ) : (
            <ul>
              {characters.map((character, index) => (
                <li key={index}>{character.name}</li>
              ))}
            </ul>
          )}
        </ContentContainer>
      </Wrapper>
    );
  }
}

export default App;
