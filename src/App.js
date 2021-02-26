import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
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



const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <CoverPage />} />
        <Route path="/board" render={() => <BoardPage />} />
        {/* <Route path="/mypage" render={() => <MyPage />} />
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
        <Route path="/loading" render={() => <LoadingPage />} /> */}
      </Switch>
    </div>
  )
};

export default withRouter(App);
