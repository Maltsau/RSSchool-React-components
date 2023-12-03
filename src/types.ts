type GenderType = 'male' | 'femele' | 'not chosen';

type FormStateType = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: GenderType;
  isTcAccepted: boolean;
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

type PasswordStrengthType =
  | ''
  | 'Very weak password'
  | 'Weak password'
  | 'Strong password'
  | 'Very strong password';

const passwordStrengthMap = {
  '': 'inherit',
  'Very weak password': 'red',
  'Weak password': '#FF9800',
  'Strong password': '#d3db29',
  'Very strong password': '#44e91b',
};

export type {
  GenderType,
  FormStateType,
  FormActionType,
  UpdateFormActionType,
  ResetFormActionType,
  PasswordStrengthType,
};

export { passwordStrengthMap };
