import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, modalMoved, messageOpen } from '../actions';
import Parts from '../style/Parts';
import styled from 'styled-components';

const CommentStyle = styled.div``;

const CommitDetailPage = (props) => {
  const state = useSelector((state) => state);
  const {
    boardIndex,
    commitDetail,
    commitDetailIndex,
    commitDetailTitle,
    commitDetailNickname,
    commitDetailCreated,
    commitDetailIsMerged,
  } = state.pageReducer;
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken, loginType } = state.userReducer;
  const [isWriter, setIsWriter] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');

  const getCommentList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/comment/list',
      method: 'GET',
      params: {
        commitIndex : commitDetailIndex,
      },
    });
    setCommentList(result.data.list);
    console.log(commentList)
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
                commitIndex: commitDetailIndex
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

  const checkMergeDeleteButton = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });
    const { data } = result;
    if (data) {
      if(!accessToken) return;
      data.map((el) => {
        if (el.board_index === boardIndex) {
          setIsWriter(true);
          setIsDelete(true);
          if (commitDetailIsMerged === 1) {
            setIsWriter(false);
            setIsDelete(false);
          }
        }
      });
    }

    const resultDelete = await axios({
      url: 'http://localhost:4000/commit/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });
    if (resultDelete.data) {
      if(!accessToken) return;
      resultDelete.data.map((el) => {
        if (el.commit_index === commitDetailIndex) {
          setIsDelete(true);
          if (commitDetailIsMerged === 1) {
            setIsDelete(false);
          }
        }
      });
    }
  };

  const handleBack = () => {
    history.push('/commit');
  };

  const handleMerge = () => {
    dispatch(modalMoved('Merge'));
  };
  const handleDelete = () => {
    dispatch(modalMoved('DeleteCommit'));
  };
  const handleComment = (e) => {
    setComment(e.target.value)
  }

  useEffect(() => {
    // console.log(commitDetailIsMerged);
    getCommentList();
    checkMergeDeleteButton();
    dispatch(pageMoved('CommitDetail'));
  }, []);

  return (
    <CommentStyle>
      <div>CommitDetailPage</div>
      <div>
        <button onClick={handleBack}>back</button>
        <h1> Title : {commitDetailTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
      </div>
      <div>
        Writer : {commitDetailNickname}
        Date : {commitDetailCreated.slice(0, 10)}
      </div>
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
      <Parts.Button display={isWriter ? '' : 'none'} onClick={handleMerge}>
        Merge
      </Parts.Button>
      <Parts.Button display={isDelete ? '' : 'none'} onClick={handleDelete}>
        Delete
      </Parts.Button>
    </CommentStyle>
  );
};

export default CommitDetailPage;
