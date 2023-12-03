import { FormStateType } from '../types';

export default function validators(formState: FormStateType) {
  const options = {
    isNameValid: () => {
      const namePattern = /^[A-Z][a-z0-9_-]{1,19}$/;
      return namePattern.test(formState.name);
    },
    isAgeValid: () => {
      return Number(formState.age) > 0;
    },
    isEmailValid: () => {
      const emailPattern = /^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(formState.email);
    },
    isPasswordValid: () => {
      return formState.password === formState.passwordConfirmation;
    },
    isTcConfirmed: () => {
      return formState.isTcAccepted;
    },
  };
  return options;
}
