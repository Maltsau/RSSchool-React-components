import styled, { keyframes } from 'styled-components';

import loaderImg from '../assets/images/loader-image.png';

const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const LoaderBody = styled.div`
  width: 130px;
  height: 130px;
  animation: ${spin} 2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderImage = styled.img`
  width: 160px;
  height: 160px;
`;

export default function Loader() {
  return (
    <LoaderBody>
      <LoaderImage src={loaderImg} alt="loader-image" />
    </LoaderBody>
  );
}
