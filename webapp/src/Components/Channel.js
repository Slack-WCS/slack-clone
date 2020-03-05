import React from 'react';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import Message from './Message';
import {
  Thread,
  TopBarChannelName,
  ChannelName,
  AllMessages,
  PostMessageInput,
} from './StyledComponents/Channel.style';
import { GlobalInput } from './StyledComponents/Menu.style';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.messagesRef = React.createRef();
    this.state = {
      chanName: this.props.chanName,
      channelId: this.props.channelId,
      isLoading: true,
      messages: [],
      messageContent: '',
      shouldRefetchMessages: false,
      errorSendingMessage: false,
      shouldScrollToMostRecent: false,
      nextPage: 1,
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate() {
    this.scrollToMostRecent();
    if (this.state.shouldRefetchMessages) {
      this.setState({ shouldRefetchMessages: false });
      this.getMessages();
    }
  }

  getMessagesContent = e => {
    this.setState({
      messageContent: [e.target.value],
    });
  };

  scrollToMostRecent = () => {
    if (this.state.shouldScrollToMostRecent) {
      this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
      this.setState({ shouldScrollToMostRecent: false });
    }
  };

  async getMessages() {
    this.setState({
      shouldRefetchMessages: false,
    });

    const response = await fetch(
      `/api/channels/${this.props.channelId}/messages?page=${this.state.nextPage}`
    );

    const { messages, nextPage } = await response.json();

    this.setState({
      messages: [...this.state.messages, ...messages],
      isLoading: false,
      shouldScrollToMostRecent: true,
      nextPage,
    });
  }

  showErrorSendingMessage = () => {
    this.setState({ errorSendingMessage: true });
  };

  sendMessage = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/channels/${this.props.channelId}/messages`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            contentMessage: this.state.messageContent[0],
            channelId: this.props.channelId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const messages = [
          { ...data, username: this.props.currentUser.username },
          ...this.state.messages,
        ];
        this.setState({
          messages: messages,
          messageContent: '',
          errorSendingMessage: false,
        });
      } else {
        this.showErrorSendingMessage();
      }
    } catch (error) {
      console.error(error);
      this.showErrorSendingMessage();
    }
  };

  fetchPreviousMessages = () => {
    this.getMessages();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // will need to refetch whenever React Router passes another channel id without unmounting component
    if (nextProps.channelId !== prevState.channelId) {
      // equivalent to this.setState(…)
      return {
        channelId: nextProps.channelId,
        chanName: nextProps.chanName,
        shouldRefetchMessages: true,
      };
    }
    return null;
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <Thread>
        <TopBarChannelName>
          <ChannelName>{this.state.chanName}</ChannelName>
        </TopBarChannelName>
        <AllMessages ref={this.messagesRef}>
          {this.state.messages.map(message => {
            return (
              <Message
                key={message.id}
                username={message.username}
                content={message.content}
                createdAt={message.created_at}
              />
            );
          })}
          <div>
            {this.state.nextPage ? (
              <button onClick={this.fetchPreviousMessages}>
                Charger les messages précédents
              </button>
            ) : null}
          </div>
        </AllMessages>
        <PostMessageInput onSubmit={this.sendMessage}>
          <InputGroup>
            {this.state.errorSendingMessage && (
              <div data-selector="error-sending-message">
                Message non envoyé – veuillez réessayer
              </div>
            )}
            <GlobalInput
              data-selector="sendMessageTextInput"
              placeholder="Write a message"
              type="text"
              value={this.state.messageContent}
              onChange={this.getMessagesContent}
            />
            <InputGroupAddon addonType="append">
              <Button className="btn submit-button" type="submit">
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </PostMessageInput>
      </Thread>
    );
  }
}

export default Channel;
