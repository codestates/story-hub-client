import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CommitCard = ({
  commitIndex,
  title,
  content,
  nickname,
  createdAt,
  upCount,
  downCount,
  visitCount,
  alertCheck,
}) => {
  return (
    <>
      <div>
        <h3 style={{ cursor: 'pointer' }} onClick={() => alertCheck(commitIndex, 'commit')}>
          {title}
        </h3>
        <span>
          {upCount} {downCount} {visitCount}
        </span>
        <div>{content}</div>
        <div>{(nickname, createdAt)}</div>
      </div>
    </>
  );
};

export default CommitCard;
