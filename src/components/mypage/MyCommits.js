import React from 'react';

const MyCommits = ({ title, upCount, createdAt }) => {
  return (
    <div>
      <h1>MyCommits</h1>
      title :<div>{title}</div>
      upCount : <div>{upCount}</div>
      createdAt : <div>{createdAt}</div>
    </div>
  );
};

export default MyCommits;
