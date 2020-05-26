import React from 'react';
import {
  MessageContainer,
  MessageHour,
  MessageOwner,
  MessageContent,
  MessageHourContainer,
} from './StyledComponents/Message.style.js';
import { DeleteButton } from './StyledComponents/DeleteButton';

const getPrintableDate = dateAsString => {
  const date = new Date(dateAsString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Message = ({
  id,
  username,
  content,
  createdAt,
  extraInfo,
  isOwner,
  deleteMessage,
}) => (
  <MessageContainer data-selector={`message-${id}`}>
    {isOwner && (
      <DeleteButton
        onClick={deleteMessage}
        dataSelector="message-delete-button"
        altText="Delete message"
      />
    )}
    <MessageHourContainer>
      <MessageHour>{getPrintableDate(createdAt)}</MessageHour>
    </MessageHourContainer>
    <MessageOwner>{username}</MessageOwner>
    <MessageContent>{content}</MessageContent>
    {extraInfo.title && (
      <a href={extraInfo.url} target="_blank" rel="noopener noreferrer">
        <article>{extraInfo.title}</article> <p>{extraInfo.description}</p>
      </a>
    )}
  </MessageContainer>
);

export default Message;
