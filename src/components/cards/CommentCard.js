import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CommentCard = ({
  commentIndex,
  content,
  nickname,
  upCount,
  downCount,
  createdAt,
  alertCheck,
}) => {
  return (
    <>
      <div>
        <h3 style={{ cursor: 'pointer' }} onClick={() => alertCheck(commentIndex, 'comment')}>
          {nickname}
        </h3>
        <span>
          {upCount} {downCount}
        </span>
        <div>{content}</div>
        <div>{createdAt}</div>
      </div>
    </>
  );
};

export default CommentCard;
