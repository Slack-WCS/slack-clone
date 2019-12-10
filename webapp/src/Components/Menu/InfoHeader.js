import React from 'react';
import { Link } from 'react-router-dom';
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
      <WebsiteName>Slack-clone</WebsiteName>

      <SessionLinksContainer>
        <SessionLinks to="/sign_up">Sign up</SessionLinks>
        <SessionLinks to="/log_in">Log in</SessionLinks>
      </SessionLinksContainer>

      <div>
        <UserStatus>•</UserStatus>
        <UserName>Nom de l'utilisateur</UserName>
      </div>
    </div>
  );
};

export default InfoHeader;
