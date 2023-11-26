import styled from 'styled-components';
import Image from 'next/image';

import nothingFoundImg from '../assets/images/nothing-found-image.png';

const NothingFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NothingFoundText = styled.h1`
  font-size: 40px;
  text-align: center;
`;

export default function NothingFoundMessage() {
  return (
    <NothingFoundContainer>
      <Image src={nothingFoundImg} alt="nothing-found-image" />
      <NothingFoundText>
        Nothing was found for your request. Try again.
      </NothingFoundText>
    </NothingFoundContainer>
  );
}
