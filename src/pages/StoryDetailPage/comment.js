import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';

const CommentPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle } = state.pageReducer;
  const { accessToken, loginType, users } = state.userReducer;
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');

  const getCommentList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/comment/list',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    console.log(result)
    setCommentList(result.data.list);
  };

  const handleSubmit = () => {
    if (comment) {
        axios({
            url: 'http://localhost:4000/comment/create',
            method: 'POST',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                loginType,
                content: comment,
                boardIndex: boardIndex
            },
        }).then((res) => {
          setComment('')
          history.go(0)
        })
    } else {
        dispatch(messageOpen('내용을 입력해주세요.'));
        return;
    }
};

const handleComment = (e) => {
  setComment(e.target.value)
}

  useEffect(() => {
    console.log(users)
    getCommentList();
  }, []);

  return (
    <>
      <div>
      <h1>{boardTitle}</h1>
      <div>
          <h1>
          New Comment
          </h1>
          <input placeholder="Please enter a comment" value = {comment} onChange = {handleComment}/>
          <button onClick={handleSubmit}>Submit</button>
      </div>
        {commentList.map((el, idx) => {
          return (
            <div key={idx}>
              <div>nickname : {el.nickname}</div>
              <div>{el.content}</div>
              <div>{el.created_at.slice(0, 10)}</div>
              <hr style={{ border: '1px solid red' }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentPage;
