import React from 'react';

const getPrintableDate = dateAsString => {
  const date = new Date(dateAsString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Message = ({ username, content, createdAt }) => {
  return (
    <div>
      <div>{getPrintableDate(createdAt)}</div>
      <b>{username}</b>
      <p>{content}</p>
    </div>
  );
};

export default Message;
