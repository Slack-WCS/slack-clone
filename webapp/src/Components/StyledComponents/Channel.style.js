import styled from 'styled-components';

const Thread = styled.div`
  @media screen and (min-width: 769px) {
    position: fixed;
    height: 100vh;
    width: 80vw;
  }
  color: #fff;
  background: #555;
  width: 100vw;
  left: 20vw;
  position: initial;
  height: calc(100vh - 37px);
`;
const TopBarChannelName = styled.div`
  @media screen and (min-width: 769px) {
    background: #444;
    padding-left: 20px;
    max-height: initial;
    height: 10vh;
  }
  height: 12vh;
  display: flex;
`;

const ChannelName = styled.h2`
  @media screen and (min-width: 769px) {
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;
    padding: 10px;
    margin: 0;
  }
  padding-left: 10px;
  display: flex;
  font-size: 25px;
  align-items: flex-end;
  margin: 0;
`;

const AllMessages = styled.div`
  @media screen and (min-width: 768px) {
    padding: 10px;
    height: calc(100vh - 18vh);
    overflow: auto;
  }
  padding: 10px;
  max-height: calc(100vh - 14vh - 37px);
  overflow: auto;
`;

const PostMessageInput = styled.form`
  max-height: 12vh;
  background: #444;
  padding: 15px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;

export {
  Thread,
  TopBarChannelName,
  ChannelName,
  AllMessages,
  PostMessageInput,
};
