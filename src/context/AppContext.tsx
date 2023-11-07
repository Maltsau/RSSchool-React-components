import { ReactNode, createContext, useState, useContext } from 'react';

export type ItemsPerPageType = 5 | 10;

interface AppContextPropsType {
  itemsPerPage: ItemsPerPageType;
  setItemsPerPage: React.Dispatch<React.SetStateAction<ItemsPerPageType>>;
}

export const AppContext = createContext<AppContextPropsType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPageType>(10);
  const contextValue = { itemsPerPage, setItemsPerPage };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}
