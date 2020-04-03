import React from 'react';
import { DeleteButton } from './StyledComponents/DeleteButton';

const getPrintableDate = dateAsString => {
  const date = new Date(dateAsString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Message = ({ username, content, createdAt, extraInfo, isOwner }) => (
  <div>
    <div>{getPrintableDate(createdAt)}</div>
    <b>{username}</b>
    <p>{content}</p>
    {extraInfo.title && (
      <a href={extraInfo.url} target="_blank" rel="noopener noreferrer">
        <article>{extraInfo.title}</article> <p>{extraInfo.description}</p>
      </a>
    )}
    {isOwner && (
      <DeleteButton
        dataSelector="message-delete-button"
        altText="Delete message"
      />
    )}
  </div>
);

export default Message;
