import { ReactNode, createContext, useState, useContext } from 'react';
import { ICharacter } from '../types';
import { ItemsPerPageType } from '../types';

interface AppContextPropsType {
  itemsPerPage: ItemsPerPageType;
  setItemsPerPage: React.Dispatch<React.SetStateAction<ItemsPerPageType>>;
  searchPattern: string;
  setSearchPattern: React.Dispatch<React.SetStateAction<string>>;
  currentItemList: ICharacter[];
  setCurrentItemList: React.Dispatch<React.SetStateAction<ICharacter[]>>;
}

export const AppContext = createContext<AppContextPropsType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPageType>(10);
  const [searchPattern, setSearchPattern] = useState<string>('');
  const [currentItemList, setCurrentItemList] = useState<ICharacter[] | []>([]);
  const contextValue = {
    itemsPerPage,
    setItemsPerPage,
    searchPattern,
    setSearchPattern,
    currentItemList,
    setCurrentItemList,
  };
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
