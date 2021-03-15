import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, modalMoved } from '../actions';
import Parts from '../style/Parts';
import styled, { keyframes }from 'styled-components'

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.2; }
    100% { opacity: 1; }
`
const CommitDetailFrame = styled.div`
display: flex;
flex-direction: column;
.back {
  animation: ${blink} 1.5s infinite both;
  cursor: pointer;
  margin: -50px auto 20px -50px;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 900;
}
.up-part {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 3px double black;
  margin-bottom: 10px;
}
.title-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.buttons{
  display: flex;
  flex-direction: row;
}
h1 {
  border: none;
  margin: 0;
}
.title {
  font-size: 1.2rem;
  font-weight: 200;
}
.info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.writer, .date {
  margin: 8px 10px 0 10px;
  font-size: 0.9rem;
  font-weight: 900;
}
.writer > span, .date > span {
  font-weight: 200;
}
.content{
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
`
const ButtonWrap = styled.div`
width: 98%;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: flex-end;
  button {
    margin-left: 5px;
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 4px;
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
    border: 3px solid rgba(223, 190, 106, 0.8);
    border-radius: 5px;
    font: 900 0.7rem serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

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
      data.map((el) => {
        if (el.board_index === boardIndex) {
          setIsWriter(true);
          setIsDelete(true);
          if (commitDetailIsMerged === '1') {
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
      resultDelete.data.map((el) => {
        if (el.commit_index === commitDetailIndex) {
          setIsDelete(true);
          if (commitDetailIsMerged === '1') {
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

  useEffect(() => {
    console.log(commitDetailIsMerged);
    checkMergeDeleteButton();
    dispatch(pageMoved('CommitDetail'));
  }, []);

  return (
    <Parts.DetailFrame>
      <CommitDetailFrame>
          <button className='back' onClick={handleBack}>←</button>
        <div className="up-part">
          <div className="title-line">
            <h1>Title :<span className="title">{commitDetailTitle}</span></h1>
              <div className="title-line">
                <div className="buttons">
                  <ButtonWrap>
                    <button display={isWriter ? '' : 'none'} onClick={handleMerge}>
                      Merge
                    </button>
                  </ButtonWrap>
                  <ButtonWrap>
                    <button display={isDelete ? '' : 'none'} onClick={handleDelete}>
                      Delete
                    </button>
                  </ButtonWrap>
                </div>
              </div>
          </div>
          <div className="info">
            <div className="writer">Writer : <span>{commitDetailNickname}</span></div>
            <div className="date">Date : <span>{commitDetailCreated.slice(0, 10)}</span></div>
          </div>
        </div>
        <div className='contentFrame'>
          <div className='content' dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
        </div>

      </CommitDetailFrame>
    </Parts.DetailFrame>
  );
};

export default CommitDetailPage;
