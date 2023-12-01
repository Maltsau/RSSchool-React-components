type GenderType = 'male' | 'femele' | 'not chosen';

type FormStateType = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: GenderType;
  tcConfirmed: boolean;
  avatar: string;
};

type FormActionType = UpdateFormActionType | ResetFormActionType;

type UpdateFormActionType = {
  type: 'UPDATE_FORM';
  field: string;
  value: string | number | boolean;
};

type ResetFormActionType = {
  type: 'RESET_FORM';
};

export type {
  GenderType,
  FormStateType,
  FormActionType,
  UpdateFormActionType,
  ResetFormActionType,
};
