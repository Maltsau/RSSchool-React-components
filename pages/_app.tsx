import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';

import Header from '@/components/Header';

const queryClient = new QueryClient();

interface ThemeInterface {
  colors: {
    primary: string;
    backgroundPrimary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: '#ffff',
    backgroundPrimary: 'black',
  },
};

const GlobalStyle = createGlobalStyle`                              
  body {
    margin: 0;
    padding: 1em;
    box-sizing: border-box;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.backgroundPrimary};
    font-family: Roboto, sans-serif;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header>
          <Component {...pageProps} />
        </Header>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
