import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';

const Header = styled.header`
  padding: 1em;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const MenuLink = styled(NavLink)`
  border: 1px solid rgba(255, 255, 255, 0.87);
  padding: 1em 2em;
  font-size: 30px;
`;

const Main = styled.main`
  min-height: 1000px;
  border: 1px solid rgba(255, 255, 255, 0.87);
`;

export default function Layout() {
  return (
    <>
      <Header>
        <NavBar>
          <MenuLink to={'/'}>Main</MenuLink>
          <MenuLink
            to={'/uncontroled-form'}
            style={({ isActive }) => (isActive ? { color: 'plum' } : {})}
          >
            Uncontrolled Form
          </MenuLink>
          <MenuLink
            to={'/react-hook-form'}
            style={({ isActive }) => (isActive ? { color: 'plum' } : {})}
          >
            React Hook Form
          </MenuLink>
        </NavBar>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
