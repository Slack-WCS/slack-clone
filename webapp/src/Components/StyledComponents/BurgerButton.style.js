import styled from 'styled-components';

const MobileBurgerButton = styled.button`
  @media all and (max-width: 768px) {
    display: block;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  height: 26px;
  position: relative;
  width: 29px;
`;

const BurgerButtonStick = styled.span`
  @media all and (max-width: 768px) {
    background: #fff;
  }
  background: black;
  height: 6px;
  border-radius: 5px;
  position: absolute;
  transition: transform 0.5s;
  &:first-child {
    top: 0;
    right: 0;
    left: 0;
  }
  &:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    left: 0;
    opacity: 1;
  }
  &:last-child {
    bottom: 0;
    right: 0;
    left: 0;
  }
  ${({ burgerButton }) =>
    burgerButton &&
    `
         &:first-child{
            transform: rotate(45deg);
    transform-origin: left 50%;
        }
        &:nth-child(2){
            opacity: 0;
    transition: opacity 0.5s;
        }
        &:last-child{
            transform: rotate(-45deg);
            transform-origin: left 50%;
        }
     `}
`;

export { BurgerButtonStick, MobileBurgerButton };
