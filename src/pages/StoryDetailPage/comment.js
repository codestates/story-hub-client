import React, { useState, useEffect } from 'react';
import UpNav from '../../components/navigators/UpNav';
import LeftDetailNav from '../../components/navigators/LeftDetailNav';
import RightNav from '../../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';

const CommentPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex } = state.pageReducer;

  const dispatch = useDispatch();

  const [commentList, setCommentList] = useState([]);

  const getCommentList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/comment/list',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    setCommentList(result.data.list);
  };
  useEffect(() => {
    dispatch(pageMoved('StoryDetail'));
    getCommentList();
  }, []);

  return (
    <>
      <div>
        {commentList.map((el, idx) => {
          return (
            <div key={idx}>
              <div>{el.nickname}</div>
              <div>{el.content}</div>
              <div>{el.created_at}</div>
              <hr style={{ border: '1px solid red' }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentPage;
