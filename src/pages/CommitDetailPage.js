import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, modalMoved, messageOpen, commitMaxDepthSaved } from '../actions';
import Parts from '../style/Parts';
import styled, { keyframes }from 'styled-components'
import cardBackground from '../images/card.png'

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.2; }
    100% { opacity: 1; }
`
const CommitDetailFrame = styled.div`
display: flex;
flex-direction: column;
height: 100%;
.back {
  margin-left: -40vw;
  margin-top: -45px;
  margin-bottom: 20px;
  animation: ${blink} 1.5s infinite both;
  cursor: pointer;
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
  flex-direction: column;
}
.buttons{
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
  margin-right: 15px;
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
  justify-content: space-between;
  margin-top: -10px;
}
.writer, .date {
  margin: 8px 10px 0 10px;
  font-size: 0.9rem;
  font-weight: 900;
}
.writer > span, .date > span {
  font-weight: 200;
}
.contentFrame {
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 90%;
  white-space: pre-wrap;
  overflow-y: auto;
}
.bottomFrame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.bottom-part {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.commit {
  border-right: 3px double black;
  justify-content: space-between;
}
.newComment {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justfy-content: space-evenly;
}
button {
  border: 3px solid gray;
  width: 100%;
  background-color: transparent;
  border-radius: 5px;
  margin-top: 5px;
  font: 900 0.8rem serif;
}
h2 {
  font-weight: 900;
}
textarea {
  width: 100%;
  height: 80%;
  white-space: normal;
  border-radius: 5px;
  margin-top: 5px;
}
.bottomFrame {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}
.comments {
  margin-left: 3vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
`
const Card = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 3vh 2vw 2vh 2vw;
width: 35%;
height: 20%;
background-size: 100% 100%;
font-size: 0.9rem;
.nickname {
font-size: 0.9rem;
font-weight: 800;
width: 100%;
border-bottom: 1px solid black;
padding-bottom: 5px;
}
.content {
  font-size: 0.8rem;
  width: 95%;
  height: 80%;
  margin: 3x;
  overflow-y: auto;
  white-space: normal;
}
.date {
font-size: 0.8rem;
width: 100%;
border-top: 1px solid black;
text-align: right;
padding-top: 5px;
}
`
const ButtonWrap = styled.div`
margin-right: 10px;
width: 90%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: flex-end;
  button {
    width: 10vw;
    min-width: 0px;
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
const PagenateFrame = styled.div`
font-size: 0.8rem;
margin-top: 15px;
ul {
width: 90%;
display: flex;
flex-direction: row;
justify-content: center;
}
li {
  display: inline-block;
  margin: 0 3px 0 3px;
}
.previous, .next {
  display: inline-block;
  margin: 0 15px 0 15px;
  font-weight: bold;
}
.selected {
  font-weight: bold;
  text-decoration: underline;
  color: #f49531;
}
`

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

  const [commentPageNumber, setCommentPageNumber] = useState(0);
  const commentBoardsPerPage = 5;
  const commentPagesVisited = commentPageNumber * commentBoardsPerPage;
  const commentPageCount = Math.ceil(commentList.length / commentBoardsPerPage);
  const commentChangePage = ({ selected }) => {
    setCommentPageNumber(selected);
  };

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
                    <div className="info">
                        <div className="writer">Writer : <span>{commitDetailNickname}</span></div>
                        <div className="date">Date : <span>{commitDetailCreated.slice(0, 10)}</span></div>
                    </div>
                </div>
                </div>
                <div className='bottomFrame'>
                  <div className='bottom-part commit'>
                    <div className='contentFrame'>
                        <div className='content' dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
                    </div>
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
                  <div className='bottom-part'>
                    <div className='comments'>
                      <Card>
                        <div className='newComment'>
                          <h2>
                          NEW COMMENT :
                          </h2>
                          <textarea placeholder="Please enter a comment" value = {comment} onChange = {handleComment}/>
                          <button onClick={handleSubmit}>SUBMIT</button>
                        </div>
                      </Card>
                      {commentList.map((el, idx) => {
                        return (
                          <Card key={idx}>
                            <div className='nickname'>{el.nickname}</div>
                            <div className='content'>{el.content}</div>
                            <div className='date'>{el.created_at.slice(0, 10)}</div>
                          </Card>
                        );
                      })}
                  </div>
                  <PagenateFrame>
                    <ReactPaginate
                      pageCount={commentPageCount}
                      previousLabel={'<'}
                      nextLabel={'>'}
                      onPageChange={commentChangePage}
                    />
                  </PagenateFrame>
                </div>
              </div>
        </CommitDetailFrame>
    </Parts.DetailFrame>
  );
};

export default CommitDetailPage;
