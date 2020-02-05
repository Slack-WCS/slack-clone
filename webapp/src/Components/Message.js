import React from 'react';

const Message = ({ currentUser, content }) => {
  return (
    <div>
      <b>{currentUser.username}</b>
      <p>{content}</p>
    </div>
  );
};

export default Message;
