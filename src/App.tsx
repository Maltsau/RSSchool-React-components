// import { useState } from 'react';
// import styled from 'styled-components';
// // import { QueryClient, QueryClientProvider } from 'react-query';
// import useFetchData from './hooks/useFetchData';
import { Route, Routes } from 'react-router-dom';

// import Loader from './components/Loader';
// import ErrorMessage from './components/ErrorMessage';
// import NothingFoundMessage from './components/NothingFoundMessage';
// import Header from './components/Header';
import Layout from './components/Layout';
import PageLayout from './components/PageLayout';
import ItemWindow from './components/ItemWindow';
// import ErrorBoundary from './components/ErrorBoundary';
// import { IDataBase } from './types';
// import { useState } from 'react';

// const queryClient = new QueryClient();

// const Wrapper = styled.main`
//   padding: 50px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 50px;
// `;

// const ContentContainer = styled.div`
//   width: 100%;
//   min-height: 500px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const CharacterList = styled.ul`
//   width: 100%;
//   list-style: none;
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   & li {
//     border: 1px solid white;
//     padding: 15px 10px;
//     font-size: 20px;
//   }
// `;

// const PagginationControls = styled.div`
//   display: flex;
//   gap: 20px;
// `;

// const PagginationItem = styled.div`
//   border-radius: 30px;
//   padding: 0 10px;
//   display: flex;
//   justify-content: center;
//   border: 1px solid white;
// `;

// const PagginationButton = styled(PagginationItem)<{ $active: boolean }>`
//   padding: 0 7px;
//   cursor: ${({ $active }) => ($active ? 'pointer' : 'auto')};
//   border: ${({ $active }) => ($active ? '1px solid white' : '1px solid grey')};
//   color: ${({ $active }) => ($active ? 'white' : 'grey')};
// `;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="page=:page_number" element={<PageLayout />}>
          <Route path="details=:item_name" element={<ItemWindow />}></Route>
        </Route>
        <Route path="search=:page_number" element={<PageLayout />}></Route>
      </Route>
    </Routes>
  );
}
// const [DB, setDB] = useState<IDataBase | object>({});
/* const [currentUrl, setCurrentUrl] = useState('https://swapi.dev/api/people/');

  const { isError, isLoading, data } = useFetchData(currentUrl); */
// if (isSuccess) {
//   setDB(data);
// }

/* return (
    <Wrapper>
      <Header />
      {isError ? (
        <ErrorMessage />
      ) : isLoading ? (
        <Loader />
      ) : (
        <ContentContainer>
          <CharacterList>
            {data?.results.length ? (
              data?.results.map((character) => (
                <li key={character.name}>{character.name}</li>
              ))
            ) : (
              <NothingFoundMessage />
            )}
          </CharacterList>
          {data?.results.length ? (
            <PagginationControls>
              <PagginationButton
                onClick={() => {
                  setCurrentUrl(data.previous ? data.previous : currentUrl);
                }}
              >{`<`}</PagginationButton>
              <PagginationItem>PAGE</PagginationItem>
              <PagginationButton
                onClick={() => {
                  setCurrentUrl(data.next ? data.next : currentUrl);
                }}
              >{`>`}</PagginationButton>
            </PagginationControls>
          ) : null}
        </ContentContainer>
      )}
    </Wrapper>
  );*/
// }

// export default function App() {
//   // const [hasError, setHasError] = useState<boolean>(false);
//   // const [searchInput, setSearchInput] = useState<string>('');

//   const { isLoading, error, data } = useQuery('fetch-data', () =>
//     fetch('https://swapi.dev/api/people/').then((response) => response.json())
//   );

//   // const handleHeaderError = () => {
//   //   setHasError(true);
//   // };

//   // const handleSearchFromHeader = (input: string) => {
//   //   setSearchInput(input);
//   // };

//   return (
//     <QueryClientProvider client={queryClient}>
//       {error ? (
//         <ErrorMessage />
//       ) : (
//         <>
//           <Wrapper>
//             <Header onInputChange={() => {}} />
//             <ContentContainer>
//               {isLoading ? JSON.stringify(data) : <Loader />}
//             </ContentContainer>
//           </Wrapper>
//         </>
//       )}
//     </QueryClientProvider>
//   );
// }

/* class App extends Component<object, State> {
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

  private handleSearchFromHeader = (input: string) => {
    this.setState({ searcInput: input });
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
              <Header onInputChange={this.handleSearchFromHeader} />
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
}*/

// export default App;
