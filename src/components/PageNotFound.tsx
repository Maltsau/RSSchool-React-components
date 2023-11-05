import styled from 'styled-components';
import { Link } from 'react-router-dom';

import pageNotFoundImage from '../assets/images/page-not-found-image.png';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h1 {
    font-size: 90px;
  }
`;

const Page404Image = styled.img`
  width: 500px;
`;

const MainPageLink = styled(Link)`
  font-size: 30px;
  background-color: white;
  color: #242424;
  padding-block: 1px;
  padding-inline: 6px;
`;

export default function PageNotFound() {
  return (
    <Wrapper>
      <Page404Image src={pageNotFoundImage} alt="page-not-found-image" />
      <h1>Page not found</h1>
      <MainPageLink to={`/page=1`}>Back to the home page</MainPageLink>
    </Wrapper>
  );
}
