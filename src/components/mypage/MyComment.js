import React from 'react';

const MyComment = ({ content, upCount, createdAt }) => {
  return (
    <div>
      <h1>MyComments</h1>
      content :<div>{content}</div>
      upCount : <div>{upCount}</div>
      createdAt : <div>{createdAt}</div>
    </div>
  );
};

export default MyComment;
