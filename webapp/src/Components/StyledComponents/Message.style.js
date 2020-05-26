import styled from 'styled-components';
import { Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';

const MessageContainer = styled.div`
  padding: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: #888;
  }
`;

const MessageHourContainer = styled.div`
  max-width: 60%;
  height: 1px;
  background-color: #666;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const MessageHour = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: -11px;
  background-color: #666;
  padding: 3px;
  border-radius: 5px;
`;
const MessageOwner = styled.b`
  margin-top: 10px;
`;
const MessageContent = styled.p`
  max-width: 95%;
`;

// /* Media Queries */
// @media all and (max-width: 768px) {

//   /* Toggle class burger menu */
//   .nav-bar .is-visible-in-mobile {
//     max-height: calc(100vh - 37px);
//     transition: max-height 1s;
//   }
// }

export {
  MessageContainer,
  MessageHour,
  MessageOwner,
  MessageContent,
  MessageHourContainer,
};
