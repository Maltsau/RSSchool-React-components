import styled from 'styled-components';
import Image from 'next/image';

import errorImg from '../assets/images/error-image.png';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorText = styled.h1`
  font-size: 40px;
  text-align: center;
`;

export default function ErrorMessage() {
  return (
    <ErrorContainer>
      <Image src={errorImg} height={480} alt="error-image" />
      <ErrorText>Something went wrong. Plese, reload the page.</ErrorText>
    </ErrorContainer>
  );
}
