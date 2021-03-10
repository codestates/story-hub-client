import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import UpNav from './components/navigators/UpNav';
import RightNav from './components/navigators/RightNav';
import LeftCreateNav from './components/navigators/LeftCreateNav';
import LeftDetailNav from './components/navigators/LeftDetailNav';
import CoverPage from './pages/CoverPage';
import BoardPage from './pages/BoardPage';
import SearchPage from './pages/SearchPage';
import AlertPage from './pages/AlertPage';
import MyPage from './pages/MyPage';
import EventPage from './pages/EventPage';
import NewCommitPage from './pages/NewCommitPage';
import CommitDetailPage from './pages/CommitDetailPage';
import NewStoryContentPage from './pages/NewStoryPage/content';
import NewStoryInfoPage from './pages/NewStoryPage/info';
import ContentPage from './pages/StoryDetailPage/content';
import InfoPage from './pages/StoryDetailPage/info';
import CommitPage from './pages/StoryDetailPage/commit';
import CommentPage from './pages/StoryDetailPage/comment';
import LoginSignUpModal from './components/modals/LoginSignUpModal';
import Message from './components/modals/messageModal';
import styled from 'styled-components'
import background from './images/backgroundImage.jpeg'
import Parts from './style/Parts';
import dotenv from 'dotenv';
import { searchList, searchTitle } from './actions';
import axios from 'axios';
dotenv.config();

const AppFrame = styled.div`
width: 100vw;
height: 100vh;
background-image: url(${background});
background-size: cover;
background-position: 50% 50%;
`

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { page, modalPage } = state.pageReducer;
  const { isOpen } = state.messageReducer;

  const getSearchList = async (title) => {
    dispatch(searchTitle(title));

    axios
      .post(
        'http://localhost:4000/board/find_title',
        {
          title,
        },
        {
          withCredentials: true,
          'Content-Type': 'application/json',
        }
      )
      .then((result) => {
        const { list } = result.data;
        dispatch(searchList(list));
      });
  };

  return (
    <AppFrame>
      <Parts.Page display={page==="Cover" ? "" : "none"}>
        <Switch>
          <Route exact path="/" render={() => <CoverPage />} />
        </Switch>
      </Parts.Page>
      <Parts.Page display={page === 'Cover' ? 'none' : ''}>
        <UpNav getSearchList={getSearchList} />
        <Parts.Page main>
          <LeftCreateNav display={page === 'NewStory' ? '' : 'none'} />
          <LeftDetailNav display={page === 'StoryDetail' ? '' : 'none'} />
          <Parts.Body width={page === 'NewStory' || page === 'StoryDetail' ? 'left' : 'none'}>
            <Switch>
              <Route path="/board" render={() => <BoardPage />} />
              <Route path="/mypage" render={() => <MyPage />} />
              <Route path="/event" render={() => <EventPage />} />
              <Route path="/alert" render={() => <AlertPage />} />
              <Route path="/search" render={() => <SearchPage />} />
              <Route path="/newcommit" render={() => <NewCommitPage />} />
              <Route path="/commitdetail" render={() => <CommitDetailPage />} />
              <Route path="/newstorycontent" render={() => <NewStoryContentPage />} />
              <Route path="/newstoryinfo" render={() => <NewStoryInfoPage />} />
              <Route path="/content" render={() => <ContentPage />} />
              <Route path="/info" render={() => <InfoPage />} />
              <Route path="/commit" render={() => <CommitPage />} />
              <Route path="/comment" render={() => <CommentPage />} />
              {/* <Route path="/loading" render={() => <LoadingPage />} /> */}
            </Switch>
          </Parts.Body>
          <RightNav />
        </Parts.Page>
      </Parts.Page>
      <LoginSignUpModal display={modalPage==="Login" ? "" : "none"}/>
      <Message display={isOpen ? "" : "none"}/>
    </AppFrame>
  );
};

export default withRouter(App);
