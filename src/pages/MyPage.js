import React, { useState, useEffect } from 'react';
import UpNav from '../components/navigators/UpNav';
import RightNav from '../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, userInfo, modalMoved } from '../actions';
import Parts from '../style/Parts';
import MyInfo from '../components/mypage/MyInfo';
import MyStory from '../components/mypage/MyStory';
import MyFavorite from '../components/mypage/MyFavorite';
import MyCommits from '../components/mypage/MyCommit';
import MyComments from '../components/mypage/MyComment';
import StoryModal from '../components/modals/MyPageModals/story'
import CommitModal from '../components/modals/MyPageModals/commit'
import CommentModal from '../components/modals/MyPageModals/comment'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const CardsFrame = styled.div`
width: 100%;
height: ${props => props.comments ? "20vh" : "35vh"};
${props => props.story ? "height: 75vh;" : ""}
display:flex;
flex-direction: row;
justyfy-content: flex-start;
align-items: center;
flex-wrap: wrap;
`

const PagenateFrame = styled.div`
font-size: 0.8rem;
margin: 5px 0 5px 0;
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

const MyPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { modalPage } = state.pageReducer;

  const [myInfo, setMyInfo] = useState([]);
  const [myStory, setMyStory] = useState([]);
  const [myFavorite, setMyFavorites] = useState([]);
  const [myCommit, setMyCommits] = useState([]);
  const [myComment, setMyComments] = useState([]);

  const [storyPageNumber, setStoryPageNumber] = useState(0);
  const [favoritePageNumber, setFavoritePageNumber] = useState(0);
  const [commitPageNumber, setCommitPageNumber] = useState(0);
  const [commentPageNumber, setCommentPageNumber] = useState(0);

  const storyBoardsPerPage = 6;
  const favoriteBoardsPerPage = 4;
  const commitBoardsPerPage = 4;
  const commentBoardsPerPage = 2;

  const storyPagesVisited = storyPageNumber * storyBoardsPerPage;
  const favoritePagesVisited = favoritePageNumber * favoriteBoardsPerPage;
  const commitPagesVisited = commitPageNumber * commitBoardsPerPage;
  const commentPagesVisited = commentPageNumber * commentBoardsPerPage;

  const storyPageCount = Math.ceil(myStory.length / storyBoardsPerPage);
  const favoritePageCount = Math.ceil(myFavorite.length / favoriteBoardsPerPage);
  const commitPageCount = Math.ceil(myCommit.length / commitBoardsPerPage);
  const commentPageCount = Math.ceil(myComment.length / commentBoardsPerPage);

  const storyChangePage = ({ selected }) => {
    setStoryPageNumber(selected);
  };
  const favoriteChangePage = ({ selected }) => {
    setFavoritePageNumber(selected);
  };
  const commitChangePage = ({ selected }) => {
    setCommitPageNumber(selected);
  };
  const commentChangePage = ({ selected }) => {
    setCommentPageNumber(selected);
  };

  const { accessToken, loginType } = state.userReducer;

  useEffect(() => {
    dispatch(pageMoved('MyPage'));
    myInfoFc();
    myStoryFc();
    MyFavoriteFc();
    MyCommitsFc();
    myCommentsFc();
  }, []);

  const myInfoFc = async () => {
    const result = await axios({
      url: 'http://localhost:4000/user/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });
    const { data } = result.data;
    setMyInfo(data);
  };

  const myStoryFc = async () => {
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
    setMyStory(data);
  };
  const MyFavoriteFc = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/favoriteinfo',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });
    const { data } = result;
    setMyFavorites(data);
  };

  const MyCommitsFc = async () => {
    const result = await axios({
      url: 'http://localhost:4000/commit/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });

    const { data } = result;
    setMyCommits(data);
  };

  const myCommentsFc = async () => {
    const result = await axios({
      url: 'http://localhost:4000/comment/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        loginType,
      },
    });

    const { list } = result.data;
    setMyComments(list);
  };

  return (
    <>
      <Parts.Board>
      <MyInfo myInfo={myInfo} />
      <h1>My Story</h1>
      {myStory.length > 0 ? (
        <>
          <CardsFrame story>
          {myStory
            .slice(storyPagesVisited, storyPagesVisited + storyBoardsPerPage)
            .map((storyBoard, idx) => {           
              return (
                <MyStory
                  key={idx}
                  boardIndex={storyBoard.board_index}
                  storyDetail={storyBoard.content}
                  title={storyBoard.title}
                  upCount={storyBoard.up_count}
                  downCount={storyBoard.down_count}
                  createdAt={storyBoard.created_at.slice(0, 10)}
                />
              );
            })}
          </CardsFrame>
          <PagenateFrame>
          <ReactPaginate
            pageCount={storyPageCount}
            previousLabel={'<'}
            nextLabel={'>'}
            onPageChange={storyChangePage}
          />
          </PagenateFrame>
        </>
        )
        : ''}
        </Parts.Board>
        <Parts.Board>
                  <h1>My Favorite</h1>
      {myFavorite.length > 0 ? (
        <>
          <CardsFrame>
          {myFavorite
            .slice(favoritePagesVisited, favoritePagesVisited + favoriteBoardsPerPage)
            .map((favoriteBoard, idx) => {           
              return (
                <MyFavorite
                  key={idx}
                  boardIndex={favoriteBoard.board_index}
                  storyDetail={favoriteBoard.content}
                  title={favoriteBoard.title}
                  upCount={favoriteBoard.up_count}
                  downCount={favoriteBoard.down_count}
                  createdAt={favoriteBoard.created_at.slice(0, 10)}
                />
              );
            })}
          </CardsFrame>
          <PagenateFrame>
          <ReactPaginate
            pageCount={favoritePageCount}
            previousLabel={'<'}
            nextLabel={'>'}
            onPageChange={favoriteChangePage}
          />
          </PagenateFrame>
        </>
        )
        : ''}
      <h1>My Commits</h1>
      {myCommit.length > 0 ? (
        <>
          <CardsFrame>
          {myCommit
            .slice(commitPagesVisited, commitPagesVisited + commitBoardsPerPage)
            .map((commitBoard, idx) => {           
              return (
                <MyCommits
                  key={idx}
                  boardIndex={commitBoard.board_index}
                  commitIndex={commitBoard.commit_index}
                  commitDetail={commitBoard.content}
                  title={commitBoard.title}
                  upCount={commitBoard.up_count}
                  downCount={commitBoard.down_count}
                  createdAt={commitBoard.created_at.slice(0, 10)}
                />
              );
            })}
          </CardsFrame>
          <PagenateFrame>
          <ReactPaginate
            pageCount={commitPageCount}
            previousLabel={'<'}
            nextLabel={'>'}
            onPageChange={commitChangePage}
          />
          </PagenateFrame>
        </>
        )
        : ''}
      <h1>My Comments</h1>
      {myComment.length > 0 ? (
        <>
          <CardsFrame comments>
          {myComment
            .slice(commentPagesVisited, commentPagesVisited + commentBoardsPerPage)
            .map((commentBoard, idx) => {           
              return (
                <MyComments
                  key={idx}
                  boardIndex={commentBoard.board_index}
                  commitIndex={commentBoard.commit_index}
                  content={commentBoard.content}
                  upCount={commentBoard.up_count}
                  downCount={commentBoard.down_count}
                  createdAt={commentBoard.created_at.slice(0, 10)}
                />
              );
            })}
          </CardsFrame>
          <PagenateFrame>
          <ReactPaginate
            pageCount={commentPageCount}
            previousLabel={'<'}
            nextLabel={'>'}
            onPageChange={commentChangePage}
          />
          </PagenateFrame>
        </>
        )
        : ''}
    </Parts.Board>
    <StoryModal display={modalPage==="MyStory" ? "" : "none"}/>
    <CommitModal display={modalPage==="MyCommit" ? "" : "none"}/>
    <CommentModal display={modalPage==="MyComment" ? "" : "none"}/>
    </>
  );
};

export default MyPage;
