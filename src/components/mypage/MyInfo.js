import React from 'react';

const MyInfo = ({ myInfo }) => {
  return (
    <div>
      <h1>MyInfo</h1>
      email : <div>{myInfo.email}</div>
      nickname : <div>{myInfo.nickname}</div>
      userName : <div>{myInfo.userName}</div>
    </div>
  );
};

export default MyInfo;
