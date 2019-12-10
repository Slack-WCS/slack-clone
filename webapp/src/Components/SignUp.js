import React from 'react';
<<<<<<< HEAD
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
=======
import {
  SignUpForm,
  SignUpFormContainer,
  SignUpLabel,
  SignUpInput,
  SignUpButton,
  LabelInputContainer,
} from './StyledComponents/SignUp.style';

const SignUp = () => {
  return (
    <SignUpFormContainer>
      <SignUpForm>
        <fieldset>
          <legend>Sign Up</legend>
          <LabelInputContainer>
            <SignUpLabel for="username">Username</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="toto189"
              name="username"
              pattern=".{1,40}"
              aria-required
              required
            />
            <span class="validity_check"></span>
          </LabelInputContainer>

          <LabelInputContainer>
            <SignUpLabel for="email">Email</SignUpLabel>
            <SignUpInput
              type="email"
              placeholder="toto@gmail.com"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              aria-required
              required
            />
            <span class="validity_check"></span>
          </LabelInputContainer>

          <LabelInputContainer>
            <SignUpLabel for="password">Password</SignUpLabel>
            <SignUpInput
              type="password"
              placeholder="totoPassword"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              aria-required
              required
            />
            <span class="validity_check"></span>
          </LabelInputContainer>

          <SignUpButton type="submit">Sign up</SignUpButton>
        </fieldset>
      </SignUpForm>
    </SignUpFormContainer>
>>>>>>> front authentification
  );
};

export default SignUp;
