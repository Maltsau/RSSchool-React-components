import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import itemsPerPageSlice from './itemsPerPageSlice';
import searchPatternSlice from './searchPatternSlice';
import api from './getItemsApi';

export const store = configureStore({
  reducer: {
    itemsPerPage: itemsPerPageSlice,
    searchPattern: searchPatternSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useStoreDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
