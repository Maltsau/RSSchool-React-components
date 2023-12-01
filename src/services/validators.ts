import { FormStateType } from '../types';

export default function Validator(formState: FormStateType) {
  const options = {
    isNameValid: () => {
      const namePattern = /^[A-Z][a-z0-9_-]{3,19}$/;
      return namePattern.test(formState.name);
    },
    isAgeValid: () => {
      return formState.age > 0;
    },
    isEmailValid: () => {
      const emailPattern = /^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(formState.email);
    },
    isPasswordValid: () => {
      return formState.password === formState.passwordConfirm;
    },
  };
  return options;
}
