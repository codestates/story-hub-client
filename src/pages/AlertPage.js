import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { pageMoved } from '../actions';
import CommitCard from '../components/cards/CommitCard';
import CommentCard from '../components/cards/CommentCard';

const CardsFrame = styled.div`
width: 45%;
height: 75vh;
display:flex;
flex-direction: column;
justyfy-content: flex-start;
align-items: center;
`

const PagenateFrame = styled.div`
font-size: 0.8rem;
margin-top: 15px;
ul {
width: 80%;
display: flex;
flex-direction: row;
justify-self: end;
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

const AlertPage = (props) => {
  const state = useSelector((state) => state);
  const { accessToken, loginType } = state.userReducer;
  const dispatch = useDispatch();
  console.log(accessToken);

  const [commits, setCommits] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    dispatch(pageMoved('Alert'));
    axios({
      url: 'http://localhost:4000/commit/alertlist',
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCommits(res.data);
        return axios({
          url: 'http://localhost:4000/comment/alertlist',
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            loginType,
          },
        });
      })
      .then((res) => {
        console.log(res.data);
        const { boardAlert, commitAlert } = res.data;
        setComments([...boardAlert, ...commitAlert]);
        return res;
      });
  }, []);

  const alertCheck = (index, alertType) => {
    console.log('@@@@@', alertType);
    axios({
      method: 'PUT',
      url: `http://localhost:4000/${alertType}/alert`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        loginType: loginType,
        index,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (alertType === 'commit') {
          const filterCommit = commits.filter((el) => el.commitIndex !== index);
          setCommits([filterCommit]);
        } else if (alertType === 'comment') {
          const filterComment = comments.filter((el) => el.commentIndex !== index);
          setComments(filterComment);
        }
        return res;
      })
      .catch((err) => console.log(err));
  };


  const [commitsPageNumber, setCommitsPageNumber] = useState(0);
  const [commentsPageNumber, setCommentsPageNumber] = useState(0);

  const commitsBoardsPerPage = 4;
  const commentsBoardsPerPage = 4;

  const commitsPagesVisited = commitsPageNumber * commitsBoardsPerPage;
  const commentsPagesVisited = commentsPageNumber * commentsBoardsPerPage;

  const commitsPageCount = Math.ceil(commits.length / commitsBoardsPerPage);
  const commentsPageCount = Math.ceil(comments.length / commentsBoardsPerPage);

  const commitsChangePage = ({ selected }) => {
    setcommitsPageNumber(selected);
  };
  const commentsChangePage = ({ selected }) => {
    setCommentsPageNumber(selected);
  };
  
  const commitList =
    commits.length > 0
      ? commits
      .slice(commitsPagesVisited, commitsPagesVisited + commitsBoardsPerPage)
          .map((el, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(el.content).contentBlocks)
            let onlyText = contentState.getPlainText()  
          return (
          <CommitCard
            key={idx}
            commitIndex={el.commitIndex}
            title={el.title}
            content={onlyText}
            nickname={el.nickname}
            createdAt={el.createdAt.slice(0, 10)}
            upCount={el.upCount}
            downCount={el.downCount}
            visitCount={el.visitCount}
            alertCheck={alertCheck}
          />
          )})
      : '';

  const commentList =
    comments.length > 0
      ? comments
      .slice(commentsPagesVisited, commentsPagesVisited + commentsBoardsPerPage)
          .map((el, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(el.content).contentBlocks)
            let onlyText = contentState.getPlainText()  
          return (
          <CommentCard
            key={idx}
            commentIndex={el.commentIndex}
            content={onlyText}
            nickname={el.nickname}
            upCount={el.upCount}
            downCount={el.downCount}
            createdAt={el.createdAt.slice(0, 10)}
            alertCheck={alertCheck}
          />
        )})
      : '';

  return (
    <>
      <CardsFrame>
        <h1>NEW COMMIT</h1>
        {commitList}
        <PagenateFrame>
        <ReactPaginate
          pageCount={commitsPageCount}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={commitsChangePage}
        />
        </PagenateFrame>
      </CardsFrame>
      <CardsFrame>
        <h1>NEW COMMENT</h1>
        {commentList}
        <PagenateFrame>
        <ReactPaginate
          pageCount={commentsPageCount}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={commentsChangePage}
        />
        </PagenateFrame>
      </CardsFrame>
    </>
  );
};

export default AlertPage;
