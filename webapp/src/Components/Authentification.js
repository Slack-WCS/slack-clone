import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './LogIn';

const Authentification = () => {
  return (
    <>
      <Link to={'/signup'}> S'inscrire ici</Link>
      <Link to={'/login'}> Déjà inscrit</Link>
    </>
  );
};
export default Authentification;
