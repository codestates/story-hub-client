import React, { useState, useEffect } from 'react';
import UpNav from '../components/navigators/UpNav';
import RightNav from '../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, userInfo } from '../actions';
import Parts from '../style/Parts';
import MyInfo from '../components/mypage/MyInfo';
import MyStory from '../components/mypage/MyStory';
import MyFavorite from '../components/mypage/MyFavorite';
import MyCommits from '../components/mypage/MyCommits';
import MyComments from '../components/mypage/MyComments';

const MyPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [myInfo, setMyInfo] = useState([]);
  const [myStory, setMyStory] = useState([]);
  const [myFavorite, setMyFavorites] = useState([]);
  const [myCommit, setMyCommits] = useState([]);
  const [myComment, setMyComments] = useState([]);

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
      <MyInfo myInfo={myInfo} />
      {myStory.length > 0
        ? myStory.map((el, idx) => (
            <MyStory
              key={idx}
              boardIndex={el.board_index}
              title={el.title}
              upCount={el.up_count}
              downCount={el.down_count}
              createdAt={el.created_at.slice(0, 10)}
            />
          ))
        : ''}
      {myFavorite.length > 0
        ? myFavorite.map((el, idx) => (
            <MyFavorite
              key={idx}
              title={el.title}
              upCount={el.up_count}
              nickName={el.nickname}
              createdAt={el.created_at.slice(0, 10)}
            />
          ))
        : ''}
      {myCommit.length > 0
        ? myCommit.map((el, idx) => (
            <MyCommits
              key={idx}
              title={el.title}
              upCount={el.up_count}
              createdAt={el.created_at.slice(0, 10)}
            />
          ))
        : ''}
      {myComment.length > 0
        ? myComment.map((el, idx) => (
            <MyComments
              key={idx}
              content={el.content}
              upCount={el.up_count}
              createdAt={el.created_at.slice(0, 10)}
            />
          ))
        : ''}
    </>
  );
};

export default MyPage;
