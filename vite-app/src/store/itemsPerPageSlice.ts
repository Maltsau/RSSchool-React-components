import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { ItemsPerPageType } from '../types';

interface ItemsPerPageStateType {
  value: ItemsPerPageType;
}

const initialState: ItemsPerPageStateType = {
  value: 10,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<ItemsPerPageType>) => {
      state.value = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export const selectItemsPerPage = (state: RootState) =>
  (state.itemsPerPage as { value: ItemsPerPageType }).value;
export default itemsPerPageSlice.reducer;
