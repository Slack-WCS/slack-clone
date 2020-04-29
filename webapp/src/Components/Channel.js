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
  state = {
    chanName: this.props.chanName,
    channelId: this.props.channelId,
    isLoading: true,
    messages: [],
    messageContent: '',
    shouldRefetchMessages: false,
  };

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate() {
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

  async getMessages() {
    this.setState({
      shouldRefetchMessages: false,
    });

    const response = await fetch(
      `/api/channels/${this.props.channelId}/messages`
    );
    const { messages } = await response.json();
    this.setState({ messages, isLoading: false });
  }

  postMessages = e => {
    fetch(`/api/channels/${this.props.channelId}/messages`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        contentMessages: this.state.messageContent[0],
      }),
    });
    e.preventDefault();
    this.setState({ shouldRefetchMessages: true, messageContent: '' });
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
        <AllMessages>
          {this.state.messages.map(message => {
            return <Message key={message.id} content={message.content} />;
          })}
        </AllMessages>
        <PostMessageInput onSubmit={this.postMessages}>
          <InputGroup>
            <GlobalInput
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
