import React from 'react';
<<<<<<< HEAD
import Authentification from '../Authentification';

=======
import { Link } from 'react-router-dom';
>>>>>>> front authentification
import {
  UserName,
  UserStatus,
  WebsiteName,
  SessionLinks,
  SessionLinksContainer,
} from '../StyledComponents/InfoHeader.style';
const InfoHeader = () => {
  return (
    <div>
<<<<<<< HEAD
      <Authentification />
      <WebsiteName>
        Slack-clone
        {/* <Logo alt="Home" src={logo} /> */}
      </WebsiteName>
=======
      <WebsiteName>Slack-clone</WebsiteName>

      <SessionLinksContainer>
        <SessionLinks to="/sign_up">Sign up</SessionLinks>
        <SessionLinks to="/log_in">Log in</SessionLinks>
      </SessionLinksContainer>
>>>>>>> front authentification

      <div>
        <UserStatus>•</UserStatus>
        <UserName>Nom de l'utilisateur</UserName>
      </div>
    </div>
  );
};

export default InfoHeader;
