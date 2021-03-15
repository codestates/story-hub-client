import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, messageOpen, storyDetailSaved, modalMoved } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts';

const ContentStyle = styled.div``;

const ContentPage = (props) => {
  const state = useSelector((state) => state);
  const { storyDetail, boardIndex } = state.pageReducer;
  const { accessToken } = state.userReducer;
  const history = useHistory();
  const [boardInfoList, setBoardInfo] = useState([]);
  const [commitInfoList, setCommitInfo] = useState([]);
  const [isWriter, setIsWriter] = useState(false);
  const dispatch = useDispatch();

  const checkUpdateDeleteButton = async () => {
    if (!accessToken) return;
    const result = await axios({
      url: 'http://localhost:4000/board/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = result;
    if (data) {
      data.map((el) => {
        if (el.board_index === boardIndex) {
          setIsWriter(true);
        }
      });
    }
  };

  const getTitle = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/detailcontent',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    const { boardInfo, commitInfo } = result.data;
    setCommitInfo(commitInfo);
    setBoardInfo(boardInfo);
  };

  const handleContinue = () => {
    if (accessToken) history.push('/newcommit');
    else dispatch(messageOpen('로그인이 필요합니다.'));
  };

  const handleUpdate = () => {
    dispatch(modalMoved('UpdateBoard'));
  };
  const handleDelete = () => {
    dispatch(modalMoved('DeleteBoard'));
  };

  useEffect(() => {
    checkUpdateDeleteButton();
    dispatch(pageMoved('StoryDetail'));
    getTitle();
  }, []);

  return (
    <ContentStyle>
      <div>ContentPage</div>
      <div>
        <Parts.Button display={isWriter ? '' : 'none'} onClick={handleUpdate}>
          Update
        </Parts.Button>
        <Parts.Button display={isWriter ? '' : 'none'} onClick={handleDelete}>
          Delete
        </Parts.Button>
      </div>
      <div>
        <h1>Title : {boardInfoList[0] ? boardInfoList[0].title : ''}</h1>
        <div>Writer : {boardInfoList[0] ? boardInfoList[0].nickname : ''}</div>
      </div>
      Content : <div dangerouslySetInnerHTML={{ __html: storyDetail }}></div>
      <div>
        {commitInfoList.map((el, idx) => {
          return (
            <div key={idx}>
              CommitContent : <div dangerouslySetInnerHTML={{ __html: el.commitContent }}></div>
              <div> - Nickname : {el.nickname}</div>
            </div>
          );
        })}
      </div>
      <button onClick={handleContinue}>Continue To Write</button>
    </ContentStyle>
  );
};

export default ContentPage;
