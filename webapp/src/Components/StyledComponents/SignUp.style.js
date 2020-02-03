import styled from 'styled-components';

const SignUpFormContainer = styled.div`
  @media screen and (min-width: 769px) {
    width: 80vw;
    left: 20vw;
    margin: 0;
    text-align: start;
  }
  text-align: center;
  color: #fff;
  width: 90vw;
  position: relative;
  height: 100vh;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

const SignUpForm = styled.form`
  @media screen and (min-width: 769px) {
    width: 40vw;
    padding-left: 60px;
  }
  color: #fff;
  background: #666;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 20px;
`;

const LabelInputContainer = styled.div`
  padding: 10px 0;
`;

const SignUpLabel = styled.label`
  @media screen and (min-width: 769px) {
    margin-left: 40px;
  }
  font-weight: bold;
  width: 100px;
`;

const SignUpInput = styled.input`
  background: #555;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #fff;
  text-indent: 5px;

  &:focus {
    background: #fff;
    color: #555;
    border: 2px solid #555;
  }

  &:valid {
    border: 2px solid #22c125;
  }
`;

const SignUpButton = styled.button`
  @media screen and (min-width: 769px) {
    margin: 10px 60px 0 auto;
  }
  margin: auto;
  display: block;
  background: #555;
  color: #fff;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 5px 20px;
`;

export {
  SignUpForm,
  SignUpFormContainer,
  SignUpLabel,
  SignUpInput,
  SignUpButton,
  LabelInputContainer,
};
