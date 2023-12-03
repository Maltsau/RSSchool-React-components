import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FormStateType,
  GenderType,
  PasswordStrengthType,
  passwordStrengthMap,
} from '../../types';
import uploadFileIcon from '../../assets/icons/upload-icon.svg';
import validators from '../../services/validators';

import { useDispatch } from 'react-redux';
import { updateWholeForm } from '../../store/formReducer';

const Container = styled.form`
  padding: 2em 5em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  & > div {
    position: relative;
  }
  & > div > div {
    color: red;
    font-size: 1em;
    height: 1em;
  }
  & > div > span {
    position: absolute;
    right: 0;
  }
  & > div > label,
  div > label > div {
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-size: 20px;
  }
  & input[type='file'] {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }
  & > div:nth-child(9) > label > div {
    padding: 0.5em;
    border: 1px solid white;
  }
  & img {
    height: 200px;
  }
`;

export default function UncontrolledForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirm] = useState('');
  const [gender, setGender] = useState<GenderType>('not chosen');
  const [isTcAccepted, setIsTcAccepted] = useState(false);
  const [avatar, setAvatar] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    tcConfirmed: '',
  });

  const validateForm = () => {
    const updatedFormData: FormStateType = {
      name,
      age,
      email,
      password,
      passwordConfirmation,
      gender,
      isTcAccepted,
      avatar,
    };

    const {
      isNameValid,
      isAgeValid,
      isEmailValid,
      isPasswordValid,
      isTcConfirmed,
    } = validators(updatedFormData);

    setValidationErrors({
      name: isNameValid()
        ? ''
        : 'Name should start with a capital letter and be at least 2 characters long',
      age: isAgeValid() ? '' : 'Age should be positive number',
      email: isEmailValid() ? '' : 'Email is invalid',
      password: isPasswordValid() ? '' : 'Passwords do not match',
      passwordConfirmation: isPasswordValid() ? '' : 'Passwords do not match',
      tcConfirmed: isTcConfirmed() ? '' : 'Please, confirm T&C',
    });

    return (
      isNameValid() &&
      isAgeValid() &&
      isEmailValid() &&
      isPasswordValid() &&
      isTcConfirmed()
    );
  };

  async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  const passwordStrengthIndicator = (
    password: string
  ): PasswordStrengthType => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length === 0) {
      return '';
    } else if (length <= 3 || (!hasDigit && !hasUppercase && !hasSpecialChar)) {
      return 'Very weak password';
    } else if (length <= 5 || (hasDigit && !hasUppercase && !hasSpecialChar)) {
      return 'Weak password';
    } else if (hasDigit && hasUppercase && !hasSpecialChar) {
      return 'Strong password';
    } else {
      return 'Very strong password';
    }
  };

  const handleUpdateWholeForm = useMemo(
    () => (updatedFormData: FormStateType) => {
      dispatch(updateWholeForm(updatedFormData));
    },
    [dispatch]
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      handleUpdateWholeForm({
        name,
        age,
        email,
        password,
        passwordConfirmation,
        gender,
        isTcAccepted,
        avatar,
      });
      navigate('/');
    }
  };

  return (
    <Container
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1>Fill out a simple form</h1>
      <div>
        <input
          type="input"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div>{validationErrors.name}</div>
      </div>
      <div>
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(Number(e.target.value));
          }}
        />
        <div>{validationErrors.age}</div>
      </div>
      <div>
        <input
          type="input"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div>{validationErrors.email}</div>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span
          style={{
            color: `${
              passwordStrengthMap[passwordStrengthIndicator(password)]
            }`,
          }}
        >
          {passwordStrengthIndicator(password)}
        </span>
        <div>{validationErrors.password}</div>
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <div>{validationErrors.passwordConfirmation}</div>
      </div>
      <div>
        <label>
          <h2>Chose your gender</h2>
          <div
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setGender(target.value as GenderType);
            }}
          >
            <input type="radio" name="gender" value="male" />
            Male
            <input type="radio" name="gender" value="female" />
            Female
            <input
              type="radio"
              name="gender"
              value="not chosen"
              defaultChecked
            />
            Not chosen
          </div>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isTcAccepted}
            onChange={() => {
              setIsTcAccepted(!isTcAccepted);
            }}
          />
          Do you accept T&C?
        </label>
        <div>{validationErrors.tcConfirmed}</div>
      </div>
      <div>
        <label>
          <h2>Chose avatar</h2>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={async (e) => {
              e.preventDefault();
              const files = e.target.files as FileList;
              try {
                const base64Result = await getBase64(files[0]);
                setAvatar(base64Result as string);
              } catch (error) {
                console.error('Error:', error);
              }
            }}
          />
          <div>
            <img src={avatar ? avatar : uploadFileIcon} />
          </div>
        </label>
      </div>
      <input type="submit" />
    </Container>
  );
}
