import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import itemsPerPageSlice from './itemsPerPageSlice';
import searchPatternSlice from './searchPatternSlice';

export const store = configureStore({
  reducer: {
    itemsPerPage: itemsPerPageSlice,
    searchPattern: searchPatternSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useStoreDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
