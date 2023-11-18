import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { AppContextProvider } from './context/AppContext';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AppContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
