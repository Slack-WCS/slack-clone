import React from 'react';
import {
  SignUpForm,
  SignUpFormContainer,
  SignUpLabel,
  SignUpInput,
  SignUpButton,
  LabelInputContainer,
} from './StyledComponents/SignUp.style';

const signUp = async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const response = await fetch('/api/users', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.ok) {
    console.log('res ok');
  } else {
    console.log('res error');
  }
};

const SignUp = () => {
  return (
    <SignUpFormContainer>
      <SignUpForm onSubmit={signUp}>
        <fieldset>
          <h2>Sign Up</h2>
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
  );
};

export default SignUp;
