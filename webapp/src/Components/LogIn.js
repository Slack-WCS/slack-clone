import React from 'react';
import {
  LabelInputContainer,
  LogInLabel,
  LogInInput,
  LogInButton,
  LogInForm,
  LogInFormContainer,
} from './StyledComponents/LogIn.style';

const LogIn = () => {
  return (
    <LogInFormContainer>
      <LogInForm>
        <fieldset>
          <legend>Login</legend>

          <LabelInputContainer>
            <LogInLabel for="email">Email</LogInLabel>
            <LogInInput
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
            <LogInLabel for="password">Password</LogInLabel>
            <LogInInput
              type="password"
              placeholder="totoPassword"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              aria-required
              required
            />
            <span class="validity_check"></span>
          </LabelInputContainer>

          <LogInButton type="submit">Login</LogInButton>
        </fieldset>
      </LogInForm>
    </LogInFormContainer>
  );
};

export default LogIn;
