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
import { log } from 'util';

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
      users: [],
    };
  }

  componentDidMount() {
    this.getMessages();
    const socket = new WebSocket('ws://127.0.0.1:8000/');
    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);
      if (
        event.type === 'MESSAGE_CREATED' &&
        parseInt(this.state.channelId) === event.payload.id_chan
      ) {
        this.setState({ messages: [event.payload, ...this.state.messages] });
      }
    };
  }

  componentDidUpdate() {
    this.scrollToMostRecent();
    if (this.state.shouldRefetchMessages) {
      this.setState({ shouldRefetchMessages: false });
      this.getMessages();
    }
  }
  getUsersFromChannel = async channelId => {
    const response = await fetch(`/api/channels/${channelId}/users`);
    const users = await response.json();
    // méthode destructurée
    this.setState({ ...users });
    // méthode non destructurée : this.setState({ users : users.users });
    // On fait users.users car il s'agit d'un objet users qui reçoit un tableau d'objets:
    // {users: Array(2)}
    // users: Array(2)
    // 0: {id: 1, username: "Michelle"}
    // 1: {id: 2, username: "patrick l'étoile de mer"}
  };

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
    console.log('this.state.messages', this.state.messages);
    this.setState({
      messages: [...this.state.messages, ...messages],
      isLoading: false,
      shouldScrollToMostRecent: false,
      nextPage,
    });
  }
  getDaysWithMessages = messages => {
    const daysWithMessages = [];
    messages.forEach(message => {
      const day = message.created_at.slice(0, 10);
      const dayWithMessages = daysWithMessages.find(item => item.day === day);
      if (!dayWithMessages) {
        daysWithMessages.push({
          day,
          messages: [message],
        });
      } else {
        dayWithMessages.messages.push(message);
      }
    });
    return daysWithMessages;
  };

  formatDate(date) {
    const today = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    if (today.toDateString() === new Date(date).toDateString()) {
      return "Ajourd'hui";
    } else if (
      new Date(today.setDate(today.getDate() - 1)).toDateString() ===
      new Date(date).toDateString()
    ) {
      return 'Hier';
    } else if (today.getUTCFullYear() > new Date(date).getUTCFullYear()) {
      return new Date(date).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      });
    } else {
      return new Date(date).toLocaleDateString(undefined, options);
    }
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
        this.setState({
          messageContent: '',
          errorSendingMessage: false,
          shouldScrollToMostRecent: true,
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

  deleteMessage = id => async () => {
    // () =>  (closure) permet de ne pas déclencher la fct deleteMessage à chaque rendu. sinon tous les messages seraient supprimés au premier render().
    try {
      const response = await fetch(`/api/messages/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      });
      if (response.ok) {
        this.setState({
          messages: this.state.messages.filter(message => message.id !== id),
        });
      }
    } catch (error) {
      // window.alert('Erreur lors de la suppression du message');
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // will need to refetch whenever React Router passes another channel id without unmounting component
    if (nextProps.channelId !== prevState.channelId) {
      // equivalent to this.setState(…)
      return {
        channelId: nextProps.channelId,
        chanName: nextProps.chanName,
        shouldRefetchMessages: true,
        messages: [],
        nextPage: 1,
      };
    }
    return null;
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading…</div>;
    }
    const daysWithMessages = this.getDaysWithMessages(this.state.messages); // je fais le group by ici dans le render pour avoir le state TJRS clean. sinon j'aurai dû faire 'this.getDaysWithMessages(this.state.messages)' dans le getMessages + dans le websocket.
    console.log(daysWithMessages, 'days with messages');

    return (
      <Thread>
        <TopBarChannelName>
          <ChannelName
            onClick={() => this.getUsersFromChannel(this.state.channelId)}
          >
            {this.state.chanName}
          </ChannelName>
          <ul>
            {this.state.users.map(user => {
              return <li key={user.id}>{user.username}</li>;
            })}
          </ul>
        </TopBarChannelName>
        <AllMessages ref={this.messagesRef}>
          <>
            {daysWithMessages.map(dayWithMessages => {
              return (
                // ici obligé de mettre un return car {}
                <>
                  {dayWithMessages.messages.map((
                    // ici return implicite car ()
                    message
                  ) => (
                    <Message
                      id={message.id}
                      key={message.id}
                      username={message.username}
                      content={message.content}
                      createdAt={message.created_at}
                      extraInfo={
                        message.extra_info ? JSON.parse(message.extra_info) : {}
                      }
                      isOwner={this.props.currentUser.id === message.user_id}
                      deleteMessage={this.deleteMessage(message.id)}
                    />
                  ))}
                </>
              );
            })}
            <div>
              {this.state.nextPage ? (
                <button onClick={this.fetchPreviousMessages}>
                  Charger les messages précédents
                </button>
              ) : null}
            </div>
          </>
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
