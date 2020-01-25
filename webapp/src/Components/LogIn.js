import React from 'react';
import { Authentification } from './StyledComponents/Authentification.style';

const LogIn = () => {
  return (
    <>
      <Authentification>
        <h2>S'identifier</h2>
        <form>
          <label htmlFor="email">Votre email :</label>
          <input type="email" name="email" />
          <label htmlFor="email">Votre mot de passe :</label>
          <input type="password" name="mdp" />
          <button type="submit">Je me connecte</button>
        </form>
      </Authentification>
    </>
  );
};

export default LogIn;
