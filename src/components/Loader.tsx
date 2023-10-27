import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderContainer = styled.div``;

const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const LoaderBody = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  animation: ${spin} 2s linear infinite;
`;

class Loader extends Component {
  render(): React.ReactNode {
    return (
      <LoaderContainer>
        <LoaderBody />
      </LoaderContainer>
    );
  }
}

export default Loader;
