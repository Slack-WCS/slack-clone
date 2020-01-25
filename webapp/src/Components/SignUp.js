import React from 'react';
import { Authentification } from './StyledComponents/Authentification.style';

const SignUp = () => {
  return (
    <>
      <Authentification>
        <h2>S'inscrire</h2>
        <form>
          <label htmlFor="email">Votre email :</label>
          <input type="email" name="email" value="email" />
          <label htmlFor="email">Votre mot de passe :</label>
          <input type="password" name="mdp" value="mdp" />
          <button type="submit">Valider</button>
        </form>
      </Authentification>
    </>
  );
};

export default SignUp;
