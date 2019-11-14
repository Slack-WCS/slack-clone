import styled from 'styled-components';

const SearchChannelBloc = styled.div`
  text-align: center;
`;

const ButtonSearchChannel = styled.button`
  background: #333;
  color: #666;
  border: 2px solid #666;
  border-radius: 5px;
  cursor: pointer;
  width: 95%;
`;

const ModalContainer = styled.div`
  @media (min-width: 576px) {
    top: 5%;
    margin: auto;
    max-width: 80%;
  }
`;

const ModalSearchChannel = styled.div`
  background: #1a1d21;
  border: solid 2px #666;
  color: #fff;
  border-radius: 20px;
`;
const SearchForm = styled.form`
  padding: 20px;
`;
const ChannelSearchInput = styled.input`
  width: 100%;
  border: none;
  background: #1a1d21;
  color: #fff;
  text-indent: 5px;
  border: 2px solid transparent;
  &:focus {
    border: 2px solid #666;
    outline: none;
    border-radius: 5px;
  }
`;

const SearchChannelList = styled.ul`
  padding: 10px 30px;
`;

const SearchChannelListElements = styled.li`
  padding: 5px 0;
`;

const ShortcutsList = styled.ul`
  padding: 10px 0;
  background-color: #222529;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ShortcutsListElements = styled.li`
  display: inline-block;
  padding: 5px 10px;
`;

export {
  SearchChannelBloc,
  ButtonSearchChannel,
  ModalContainer,
  ModalSearchChannel,
  SearchForm,
  ChannelSearchInput,
  SearchChannelList,
  SearchChannelListElements,
  ShortcutsList,
  ShortcutsListElements,
};
