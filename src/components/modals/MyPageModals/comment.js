import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalMoved,
  boardIndexSaved,
  boardTitleSaved,
  storyDetailSaved,
  setMyPageProps,
} from '../../../actions';
import Parts from '../../../style/Parts';
import styled from 'styled-components';
import React, { useEffect } from 'react';

const ModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 280px;
  background-color: white;
  border: 2px solid rgb(220, 220, 220);
  box-shadow: 3px 3px 12px gray;
  padding: 10px;
  font-size: 0.9rem;
  .close {
    align-self: start;
    margin-bottom: -10px;
    background-color: transparent;
    font-weight: 400;
    font-size: 1.5rem;
    border: none;
  }
  .upCount {
    margin: -10px 20px 0 auto;
  }
  h2 {
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1rem;
    border-bottom: 1px solid black;
    width: 140px;
    text-align: center;
    padding-bottom: 5px;
  }
  .content {
    width: 250px;
    height: 35px;
    margin: 10px;
    font-size: 0.8rem;
    background-color: rgb(220, 220, 220);
    border-radius: 20px;
    padding: 15px;
    white-space: normal;
    overflow-y: hidden;
  }
  .createdAt {
    border-bottom: 3px double black;
    width: 90%;
    text-align: right;
    padding-bottom: 3px;
  }
  .toDetail {
    margin: auto 0 20px 0;
    width: 80%;
    height: 50px;
    border-radius: 15px;
  }
`;

const myComment = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { accessToken } = state.userReducer;
  const { myPageProps, boardIndex } = state.pageReducer;
  const history = useHistory();
  useEffect(() => {
    dispatch(modalMoved(''));
  }, []);

  return (
    <Parts.ModalBackground display={props.display === 'none' ? 'none' : ''}>
      <ModalFrame>
        <button
          className="close"
          onClick={() => {
            dispatch(modalMoved(''));
            dispatch(setMyPageProps({}));
          }}
        >
          x
        </button>
        <div className="upCount">{myPageProps.upCount}</div>
        <h1 style={{ textAlign: 'center', padding: '0 0 5px 0' }}>My Comment</h1>
        <div className="content">{myPageProps.content}</div>
        <div className="createdAt">DATE : {myPageProps.createdAt}</div>
        <button
          className="toDetail"
          onClick={() => {
            // if (myPageProps.commitIndex) {
            //     const boardIndex = myPageProps.commitIndex
            //     axios({
            //         url: 'http://localhost:4000/commit/list',
            //         method: 'GET',
            //         params: {
            //             boardIndex,
            //         },
            //     }).then( res => {
            //         console.log(res.data)
            //     })

            //     history.push('/commitdetail')
            // }
            // if (myPageProps.boardIndex) {
            //     const boardIndex =
            dispatch(boardIndexSaved(myPageProps.boardIndex));
            axios({
              url: 'http://localhost:4000/board/detailcontent',
              method: 'GET',
              params: {
                boardIndex,
              },
            }).then((res) => {
              dispatch(storyDetailSaved(res.data.boardInfo[0].content));
              dispatch(boardTitleSaved(res.data.boardInfo[0].title));
              history.push('/content');
            });
            // }
            dispatch(modalMoved(''));
          }}
        >
          To the Detail
        </button>
        <button
          className="toDetail"
          onClick={() => {
            axios({
              url: 'http://localhost:4000/comment',
              method: 'DELETE',
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              data: {
                commentIndex: myPageProps.commentindex,
              },
            });
            window.location.reload();
            dispatch(modalMoved(''));
            dispatch(setMyPageProps({}));
          }}
        >
          Delete
        </button>
      </ModalFrame>
    </Parts.ModalBackground>
  );
};

export default myComment;
