import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, modalMoved, messageOpen, commitMaxDepthSaved } from '../actions';
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
    commitMaxDepth,
  } = state.pageReducer;
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken } = state.userReducer;
  const [isWriter, setIsWriter] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');

  const getCommentList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/comment/list',
      method: 'GET',
      params: {
        commitIndex: commitDetailIndex,
      },
    });
    setCommentList(result.data.list);
  };

  const handleSubmit = () => {
    if (!accessToken) dispatch(messageOpen('로그인이 필요합니다.'));
    else {
      if (comment) {
        axios({
          url: 'http://localhost:4000/comment/create',
          method: 'POST',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            content: comment,
            commitIndex: commitDetailIndex,
            boardIndex: boardIndex,
          },
        }).then((res) => {
          setComment('');
          history.go(0);
        });
      } else {
        dispatch(messageOpen('내용을 입력해주세요.'));
        return;
      }
    }
  };

  const checkMergeDeleteButton = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = result;
    if (data) {
      console.log(data)
      if (!accessToken) return;
      data.map((el) => {
        if (el.board_index === boardIndex) {
          setIsWriter(true);
          setIsChange(true);
          if (commitDetailIsMerged === 1) {
            setIsWriter(false);
            setIsChange(false);
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
    });
    if (resultDelete.data) {
      console.log(resultDelete.data)
      if (!accessToken) return;
      resultDelete.data.map((el) => {
        if (el.commit_index === commitDetailIndex) {
          setIsChange(true);
          if (commitDetailIsMerged === 1) {
            setIsChange(false);
          }
          if (el.depth < commitMaxDepth) {
            setIsWriter(false);
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
    dispatch(commitMaxDepthSaved(commitMaxDepth + 1));
  };
  const handleDelete = () => {
    dispatch(modalMoved('DeleteCommit'));
  };
  const handleUpdate = () => {
    dispatch(modalMoved('UpdateCommit'));
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    getCommentList();
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
                                <button display={isChange ? '' : 'none'} onClick={handleDelete}>
                                    Delete
                                </button>
                            </ButtonWrap>
                            <ButtonWrap>
                                <button display={isChange ? '' : 'none'} onClick={handleUpdate}>
                                    Update
                                </button>
                            </ButtonWrap>
                        </div>
                    </div>
                </div>
          </div>
          <div className="info">
            <div className="writer">Writer : <span>{commitDetailNickname}</span></div>
            <div className="date">Date : <span>{commitDetailCreated.slice(0, 10)}</span></div>
          </div>
          <div className='contentFrame'>
              <div className='content' dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
        </div>
          <div>
            <h1>New Comment</h1>
            <input placeholder="Please enter a comment" value={comment} onChange={handleComment} />
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
        </CommitDetailFrame>
    </Parts.DetailFrame>
  );
};

export default CommitDetailPage;
