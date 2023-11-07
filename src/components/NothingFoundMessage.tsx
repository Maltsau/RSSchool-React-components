import styled from 'styled-components';

import nothingFoundImg from '../assets/images/nothing-found-image.png';

const NothingFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NothingFoundImage = styled.img`
  width: 300px;
`;

const NothingFoundText = styled.h1`
  font-size: 40px;
  text-align: center;
`;

export default function NothingFoundMessage() {
  return (
    <NothingFoundContainer>
      <NothingFoundImage src={nothingFoundImg} alt="nothing-found-image" />
      <NothingFoundText>
        Nothing was found for your request. Try again.
      </NothingFoundText>
    </NothingFoundContainer>
  );
}
