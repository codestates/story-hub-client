import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
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
import LoadingPage from './pages/LoadingPage';
import NewStoryContentPage from './pages/NewStoryPage/content';
import NewStoryInfoPage from './pages/NewStoryPage/info';
import ContentPage from './pages/StoryDetailPage/content';
import InfoPage from './pages/StoryDetailPage/info';
import CommitPage from './pages/StoryDetailPage/commit';
import CommentPage from './pages/StoryDetailPage/comment';
import Parts from './style/Parts'
import Switch, { Case, Default } from 'react-switch-case';



const App = () => {
  // console.log(state);
  const state = useSelector((state) => state)
  const { isLogo, isCreate, isDetail } = state.buttonReducer;
  // const isLogo = "isLogo"
  // const isCreate = "isCreate"
  // const isDetail = "isDetail"

  return ( <Switch condition={isLogo || isCreate || isDetail }>
      <Case value = "isLogo">
        <Route exact path="/" render={() => <CoverPage />} />
      </Case>
      <Case value = "isCreate">
        <UpNav/>
        <Parts.Body>
          <Route path="/newstorycontent" render={() => <NewStoryContentPage />} />
          <Route path="/newstoryinfo" render={() => <NewStoryInfoPage />} />
        <LeftCreateNav/>
        <RightNav/>
        </Parts.Body>
      </Case>
      <Case value = "isDetail">
      <UpNav/>
        <Parts.Body>
          <Route path="/content" render={() => <ContentPage />} />
          <Route path="/info" render={() => <InfoPage />} />
          <Route path="/commit" render={() => <CommitPage />} />
          <Route path="/comment" render={() => <CommentPage />} />
        </Parts.Body>
        <LeftDetailNav/>
        <RightNav/>
      </Case>
      <Default>
      <UpNav/>
        <Parts.Body>
          <Route path="/board" render={() => <BoardPage />} />
          <Route path="/mypage" render={() => <MyPage />} />
          <Route path="/event" render={() => <EventPage />} />
          <Route path="/alert" render={() => <AlertPage />} />
          <Route path="/search" render={() => <SearchPage />} />
          <Route path="/newcommit" render={() => <NewCommitPage />} />
          <Route path="/commitdetail" render={() => <CommitDetailPage />} />
        </Parts.Body>
        <RightNav/>
      </Default>
    </Switch> )
};

export default withRouter(App);
