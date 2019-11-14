import React from 'react';
import {
  UserName,
  UserStatus,
  WebsiteName,
} from '../StyledComponents/InfoHeader.style';

const InfoHeader = () => {
  return (
    <div>
      <WebsiteName>
        Slack-clone
        {/* <Logo alt="Home" src={logo} /> */}
      </WebsiteName>

      <div>
        <UserStatus>•</UserStatus>
        <UserName>Nom de l'utilisateur</UserName>
      </div>
    </div>
  );
};

export default InfoHeader;
