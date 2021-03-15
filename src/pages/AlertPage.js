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
  const { accessToken } = state.userReducer;
  const dispatch = useDispatch();
  console.log(accessToken);

  const [commits, setCommits] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    dispatch(pageMoved('Alert'));
    axios({
      url: 'http://localhost:4000/commit/alertlist',
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        });
      })
      .then((res) => {
        console.log(res.data);
        const { boardAlert, commitAlert } = res.data;
        setComments([...boardAlert, ...commitAlert]);
        return res;
      });
  }, []);

  const alertCheck = (index, alertType) => {
    console.log('@@@@@', alertType);
    axios({
      method: 'PUT',
      url: `http://localhost:4000/${alertType}/alert`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        index,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (alertType === 'commit') {
          const filterCommit = commits.filter((el) => el.commitIndex !== index);
          setCommits([filterCommit]);
        } else if (alertType === 'comment') {
          const filterComment = comments.filter((el) => el.commentIndex !== index);
          setComments(filterComment);
        }
        return res;
      })
      .catch((err) => console.log(err));
  };

  const commitList =
    commits.length > 0
      ? commits.map((el, idx) => (
          <CommitCard
            key={idx}
            commitIndex={el.commitIndex}
            title={el.title}
            content={el.content}
            nickname={el.nickname}
            createdAt={el.createdAt.slice(0, 10)}
            upCount={el.upCount}
            downCount={el.downCount}
            visitCount={el.visitCount}
            alertCheck={alertCheck}
          />
        ))
      : '';

  const commentList =
    comments.length > 0
      ? comments.map((el, idx) => (
          <CommentCard
            key={idx}
            commentIndex={el.commentIndex}
            content={el.content}
            nickname={el.nickname}
            upCount={el.upCount}
            downCount={el.downCount}
            createdAt={el.createdAt.slice(0, 10)}
            alertCheck={alertCheck}
          />
        ))
      : '';

  return (
    <>
      <div>
        <div>NEW COMMIT</div>
        {commitList}
      </div>
      <div>
        <div>NOW COMMENT</div>
        {commentList}
      </div>
    </>
  );
};

export default AlertPage;
