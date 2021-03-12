import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';

const ContentPage = (props) => {
  const state = useSelector((state) => state);
  const { storyDetail, boardIndex } = state.pageReducer;

  const [boardInfoList, setBoardInfo] = useState([]);
  const [commitInfoList, setCommitInfo] = useState([]);

  const dispatch = useDispatch();

  const detailCommit = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/detailcontent',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    const { boardInfo, commitInfo } = result.data;

    setBoardInfo(boardInfo);
    setCommitInfo(commitInfo);
  };

  useEffect(() => {
    detailCommit();
    dispatch(pageMoved('StoryDetail'));
  }, []);

  return (
    <>
      <div>ContentPage</div>
      <div dangerouslySetInnerHTML={{ __html: storyDetail }}></div>
      <div>
        {boardInfoList.map((el, idx) => {
          return (
            <div key={idx}>
              <h1>{el.title}</h1>
              <div>{el.content}</div>
              <div>{el.nickname}</div>
            </div>
          );
        })}
        <hr style={{ border: '1px solid red' }} />
        {commitInfoList.length > 0
          ? commitInfoList.map((el, idx) => {
              return (
                <div key={idx}>
                  <div>{el.nickname}</div>
                  <div>{el.commitContent}</div>
                  <hr style={{ border: '1px solid red' }} />
                </div>
              );
            })
          : ''}
      </div>
      <Link to="/newcommit">
        <button>Continue To Write</button>
      </Link>{' '}
    </>
  );
};

export default ContentPage;
