import React from 'react';

const MyFavorite = ({ title, nickName, upCount, createdAt }) => {
  return (
    <div>
      <h1>MyFavorite</h1>
      title :<div>{title}</div>
      nickname : <div>{nickName}</div>
      upCount : <div>{upCount}</div>
      createdAt : <div>{createdAt}</div>
    </div>
  );
};

export default MyFavorite;
