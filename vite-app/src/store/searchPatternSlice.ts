import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SearchPatternStateType {
  value: string;
}

const initialState: SearchPatternStateType = {
  value: '',
};

export const searchPatternSlice = createSlice({
  name: 'searchPattern',
  initialState,
  reducers: {
    setSearchPattern: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchPattern } = searchPatternSlice.actions;
export const selectSearchPattern = (state: RootState) =>
  (state.searchPattern as { value: string }).value;
export default searchPatternSlice.reducer;
