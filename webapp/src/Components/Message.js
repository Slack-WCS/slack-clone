import React from 'react';

const Message = ({ currentUser }) => {
  return (
    <div>
      <b>{currentUser.username}</b>
      <p>{this.props.content}</p>
    </div>
  );
};

export default Message;
