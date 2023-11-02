import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Wrapper = styled.main`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}
