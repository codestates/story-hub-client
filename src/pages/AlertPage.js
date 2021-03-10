import React, { useState, useEffect } from 'react';
import UpNav from '../components/navigators/UpNav';
import RightNav from '../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions';
import CommitCard from '../components/cards/CommitCard';
import CommentCard from '../components/cards/CommentCard';

const AlertPage = (props) => {
  const state = useSelector((state) => state);

  const { accessToken, loginType } = state.userReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageMoved('Alert'));
    axios({
      url: 'http://localhost:4000/commit/alertlist',
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCommits(res.data);
        return axios({
          url: 'http://localhost:4000/comment/alertlist',
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            loginType,
          },
        });
      })
      .then((res) => {
        console.log(res.data);
        const { boardAlert, commitAlert } = res.data;
        setComments([...boardAlert, ...commitAlert]);
        return res;
      });
  }, []);
  const [commits, setCommits] = useState([]);
  const [comments, setComments] = useState([]);

  return (
    <>
      <div>
        <div>NEW COMMIT</div>
        {commits.length > 0
          ? commits.map((el, idx) => (
              <CommitCard
                key={idx}
                boardIndex={el.boardIndex}
                title={el.title}
                content={el.content}
                nickname={el.nickname}
                createdAt={el.createdAt.slice(0, 10)}
                upCount={el.upCount}
                downCount={el.downCount}
                visitCount={el.visitCount}
              />
            ))
          : ''}
      </div>
      <div>
        <div>NOW COMMENT</div>
        {comments.length > 0
          ? comments.map((el, idx) => (
              <CommentCard
                key={idx}
                commentIndex={el.commentIndex}
                content={el.content}
                nickname={el.nickname}
                upCount={el.upCount}
                downCount={el.downCount}
                createdAt={el.createdAt.slice(0, 10)}
              />
            ))
          : ''}
      </div>
    </>
  );
};

export default AlertPage;
