import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts'

const ContentStyle = styled.div`
height: 77%;
.title {
    font-size: 1.2rem;
    font-weight: 200;
}
.writer {
    margin: 8px 10px 0 10px;
    font-size: 0.9rem;
    font-weight: 900;
}
.writer > span {
    font-weight: 200;
}
.contentFrame {
    width: 90%;
    height: 90%;
    position: relative;
    left: 5%;
    overflow-y: auto;
}
.content {
    width: 100%;
    white-space: pre-wrap;
}
.committer {
  width: 95%;
  text-align: right;
  font-size: 0.8rem;
  margin: 10px;
  border-bottom: 1px solid gray;
}
`;

const ButtonWrap = styled.div`
width: 98%;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: flex-end;
  button {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 15px;
    transition: all 0.5s ease-out;
    background: linear-gradient(
      270deg,
      rgba(223, 190, 106, 0.8),
      rgba(146, 111, 52, 0.8),
      rgba(34, 34, 34, 0),
      rgba(34, 34, 34, 0)
    );
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    margin: 0.625rem;
    border: 3px solid rgba(223, 190, 106, 0.8);
    border-radius: 5px;
    font: 900 0.8rem serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

const ContentPage = (props) => {
  const state = useSelector((state) => state);
  const { storyDetail, boardIndex } = state.pageReducer;
  const [boardInfoList, setBoardInfo] = useState([]);
  const [commitInfoList, setCommitInfo] = useState([]);
  const dispatch = useDispatch();
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

  useEffect(() => {
    getTitle();
    dispatch(pageMoved('StoryDetail'));
  }, []);
  return (
    <Parts.DetailFrame>
        <ContentStyle>
        <div>
            <h1>Title :
                <span className="title">{boardInfoList[0] ? boardInfoList[0].title : ''}</span>
                <div className="writer">Writer : <span>{boardInfoList[0] ? boardInfoList[0].nickname : ''}</span></div>
            </h1>
        </div >
        <div className="contentFrame">
            <div className="content" dangerouslySetInnerHTML={{ __html: storyDetail }}></div>
            <div>
                {commitInfoList.map((el, idx) => {
                return (
                    <div key={idx}>
                      <div className='committer'> COMMITTER : {el.nickname}</div>
                      <div className='commit' dangerouslySetInnerHTML={{ __html: el.commitContent }}></div>
                      
                    </div>
                );
                })}
            </div>
        </div>
        <ButtonWrap>
            <Link to="/newcommit">
                <button>Continue To Write</button>
            </Link>{' '}
        </ButtonWrap>
        </ContentStyle>
    </Parts.DetailFrame>
  );
};

export default ContentPage;
