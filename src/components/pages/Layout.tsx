import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const neonEffect =
  '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;';

const Header = styled.header`
  margin-bottom: -1px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const MenuLink = styled(NavLink)<{ isNavigated?: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.87);
  padding: 1em 2em;
  font-size: 30px;
  border-bottom: ${(props) => props.isNavigated && '1px solid #02020e'};
  text-shadow: ${(props) => props.isNavigated && neonEffect};
  background-color: ${(props) => props.isNavigated && '#02020e'};
`;

const Main = styled.main`
  min-height: 1000px;
  border: 1px solid rgba(255, 255, 255, 0.87);
  background-color: #02020e;
`;

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Header>
        <NavBar>
          <MenuLink to={'/'} isNavigated={location.pathname === '/'}>
            Main
          </MenuLink>
          <MenuLink
            to={'/uncontroled-form'}
            isNavigated={location.pathname === '/uncontroled-form'}
          >
            Uncontrolled Form
          </MenuLink>
          <MenuLink
            to={'/react-hook-form'}
            isNavigated={location.pathname === '/react-hook-form'}
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
