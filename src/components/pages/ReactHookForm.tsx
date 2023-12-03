import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateWholeForm } from '../../store/formReducer';

import {
  GenderType,
  PasswordStrengthType,
  passwordStrengthMap,
} from '../../types';
import uploadFileIcon from '../../assets/icons/upload-icon.svg';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: GenderType;
  isTcAccepted: boolean;
  avatar: string;
};

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

  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthType>('');
  const [avatar, setAvatar] = useState('');

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      gender: 'not chosen',
    },
    mode: 'all',
  });
  const watchInputs = watch();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    data.avatar = avatar;
    dispatch(updateWholeForm(data));
    navigate('/');
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>Fill out a simple form</h1>
      <div>
        <input
          type="input"
          placeholder="Name"
          {...register('name', {
            required: 'Set name, please',
            pattern: {
              value: /^[A-Z][a-z0-9_-]{1,19}$/,
              message:
                'Name should start with a capital letter and be at least 2 characters long',
            },
          })}
        />
        <div>{errors.name && errors.name.message}</div>
      </div>
      <div>
        <input
          type="number"
          placeholder="Age"
          {...register('age', {
            required: 'Set age, please',
            min: { value: 1, message: 'Age should be positive number' },
          })}
        />
        <div>{errors.age && errors.age.message}</div>
      </div>
      <div>
        <input
          type="input"
          placeholder="E-mail"
          {...register('email', {
            required: 'Set e-mail, please',
            pattern: {
              value: /^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'E-mail is invalid',
            },
          })}
        />
        <div>{errors.email && errors.email.message}</div>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter password"
          {...register('password', { required: 'Set password, please' })}
          onChange={(e) => {
            const password = e.target.value;
            setPasswordStrength(passwordStrengthIndicator(password));
          }}
        />
        <span style={{ color: passwordStrengthMap[passwordStrength] }}>
          {passwordStrength}
        </span>
        <div>{errors.password && errors.password.message}</div>
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm password"
          {...register('passwordConfirmation', {
            required: 'Confirm password, please',
            validate: (value) =>
              value === watchInputs.password || 'The passwords do not match',
          })}
        />
        <div>
          {errors.passwordConfirmation && errors.passwordConfirmation.message}
        </div>
      </div>
      <div>
        <label>
          <h2>Chose your gender</h2>
          <div>
            <input type="radio" value="male" {...register('gender')} />
            Male
            <input type="radio" value="female" {...register('gender')} />
            Female
            <input
              type="radio"
              value="not chosen"
              defaultChecked
              {...register('gender')}
            />
            Not chosen
          </div>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            {...register('isTcAccepted', { required: 'Please, confirm T&C' })}
          />
          Do you accept T&C?
        </label>
        <div>{errors.isTcAccepted && errors.isTcAccepted.message}</div>
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
