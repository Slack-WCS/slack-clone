import styled from 'styled-components';
import { Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';

const MenuListElements = styled.li`
  padding: 5px 0px;
`;
const CreateChannelForm = styled(Form)`
  padding: 5px 0px;
  width: 95%;
  margin: auto;
`;
const GlobalInput = styled(Input)`
  appearance: none;
  background: #444;
  border: solid 1px #fff;
  border-radius: 10px 0 0 10px;
  text-indent: 5px;
  color: #666;
  &:focus {
    background: #444;
    color: #fff;
    border: solid 2px #fff;
    outline: none;
  }
`;
const Navbar = styled.nav`
  @media all and (max-width: 768px) {
    background: #333;
    padding: 5px;
    position: fixed;
    width: 100vw;
  }
  position: fixed;
  z-index: 2000;
`;
const LeftNavbar = styled.ul`
  @media all and (max-width: 768px) {
    max-height: 0;
    transition: max-height 0.5s;
    width: auto;

    ${({ isOpenMenu }) =>
      isOpenMenu &&
      `
    max-height: calc(100vh - 37px);
    transition: max-height 1s;
  `}
  }
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100vh;
  width: 20vw;
  background: #333;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const RouteLink = styled(Link)`
  @media all and (max-width: 768px) {
    margin: 0;
    margin-bottom: 1px;
  }

  padding: 8px 20px;
  text-decoration: none;
  background: #333;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  display: block;

  &:hover {
    background: #fff;
    color: #333;
  }

  &:focus {
    background: #fff;
    color: #333;
  }
`;

const NavbarLinks = styled.a`
  @media all and (max-width: 768px) {
    margin: 0;
    margin-bottom: 1px;
  }
  padding: 8px 20px;
  text-decoration: none;
  background: #333;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  display: block;

  &:hover {
    background: #fff;
    color: #333;
  }

  &:focus {
    background: #fff;
    color: #333;
  }
`;

// /* Media Queries */
// @media all and (max-width: 768px) {

//   /* Toggle class burger menu */
//   .nav-bar .is-visible-in-mobile {
//     max-height: calc(100vh - 37px);
//     transition: max-height 1s;
//   }
// }

export {
  MenuListElements,
  CreateChannelForm,
  GlobalInput,
  Navbar,
  LeftNavbar,
  RouteLink,
  NavbarLinks,
};
