import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateType } from '../types';

const initialState: FormStateType = {
  name: '',
  age: 0,
  email: '',
  password: '',
  passwordConfirmation: '',
  gender: 'not chosen',
  isTcAccepted: false,
  avatar: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetForm: () => initialState,
    updateWholeForm: (state, action: PayloadAction<FormStateType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { resetForm, updateWholeForm } = formSlice.actions;
export default formSlice.reducer;
