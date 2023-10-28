import React, { Component } from 'react';
import styled from 'styled-components';

import errorImg from '../assets/images/error-image.png';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ErrorImage = styled.img`
  width: 300px;
`;

const ErrorText = styled.h1`
  font-size: 40px;
  text-align: center;
`;

class ErrorMessage extends Component {
  render(): React.ReactNode {
    return (
      <ErrorContainer>
        <ErrorImage src={errorImg} alt="error-image" />
        <ErrorText>Something went wrong. Plese, reload the page.</ErrorText>
      </ErrorContainer>
    );
  }
}

export default ErrorMessage;
