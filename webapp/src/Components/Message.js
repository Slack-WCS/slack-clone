import React from 'react';

const Message = ({ username, content }) => {
  return (
    <div>
      <b>{username}</b>
      <p>{content}</p>
    </div>
  );
};

export default Message;
