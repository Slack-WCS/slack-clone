import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SessionLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
`;

const SessionLinks = styled(Link)`
  color: #fff;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

const WebsiteName = styled.h1`
  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  padding: 10px;
  font-weight: bold;
`;

const Logo = styled.img`
  width: 100%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1) rotate(180deg);
`;
const UserStatus = styled.span`
  color: rgb(1, 240, 1);
  margin-left: 10px;
  font-size: 1.5em;
  line-height: 1;
  display: inline-block;
`;
const UserName = styled.p`
  margin: 0;
  margin-left: 10px;
  display: inline-block;
  color: #fff;
`;

export {
  Logo,
  UserName,
  UserStatus,
  WebsiteName,
  SessionLinks,
  SessionLinksContainer,
};
