import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateType } from '../types';

const initialState: FormStateType = {
  name: '',
  age: 0,
  email: '',
  password: '',
  passwordConfirm: '',
  gender: 'not chosen',
  tcConfirmed: false,
  avatar: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (
      state,
      action: PayloadAction<{ field: string; value: string | number | boolean }>
    ) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    resetForm: () => initialState,
    updateWholeForm: (state, action: PayloadAction<FormStateType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateForm, resetForm, updateWholeForm } = formSlice.actions;
export default formSlice.reducer;
