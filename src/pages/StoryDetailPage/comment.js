import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { pageMoved } from '../../actions';
import styled from 'styled-components'
import Parts from '../../style/Parts'
import cardBackground from '../../images/card.png'

const CommentStyle = styled.div`
.upperFrame {
  margin-top: -20px;
}
.title {
  font-size: 1.2rem;
  font-weight: 200;
}
.newComment {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justfy-content: center;
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
  height: 50%;
  white-space: normal;
  border-radius: 5px;
  margin-top: 5px;
}
.bottomFrame {
  position: relative;
  left: 5%;
  width: 90%;
  height: 60vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
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
width: 40%;
height: 23%;
min-height: 20px;
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
  margin: 10px;
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

const CommentPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle } = state.pageReducer;
  const { accessToken, loginType, users } = state.userReducer;
  const dispatch = useDispatch();
  const history = useHistory();
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
    <Parts.DetailFrame>
      <CommentStyle>
        <div className='upperFrame'>
          <div>
              <h1>Title :
                  <span className="title">{boardTitle}</span>
              </h1>
          </div >
        </div>
        <div className='bottomFrame'>
          <Card>
            <div className='newComment'>
              <h2>
              NEW COMMENT :
              </h2>
              <textarea placeholder="Please enter a comment" value = {comment} onChange = {handleComment}/>
              <button onClick={handleSubmit}>SUBMIT</button>
            </div>
          </Card>
          {commentList
          .slice(commentPagesVisited, commentPagesVisited + commentBoardsPerPage)
          .map((commentBoard, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(commentBoard.content).contentBlocks)
            let onlyText = contentState.getPlainText()              
            return (
              <Card key={idx}>
                <div className='nickname'>{commentBoard.nickname}</div>
                <div className='content'>{commentBoard.content}</div>
                <div className='date'>{commentBoard.created_at.slice(0,10)}</div>
              </Card>
            );
          })}
        </div>
        <PagenateFrame>
        <ReactPaginate
          pageCount={commentPageCount}
          // pageRangeDisplayed={5}
          // marginPagesDisplayed={0}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={commentChangePage}
          // containerClassName={"pagination-ul"}
          // activeClassName={"currentPage"}
          // previousClassName={"pageLabel-btn"}
          // nextClassName={"pageLabel-btn"}
        />
        </PagenateFrame>
      </CommentStyle>
    </Parts.DetailFrame>
  );
};

export default CommentPage;
