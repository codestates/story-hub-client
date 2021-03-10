import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved, userLogout, messageOpen, searchTitle, searchList } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts';
import logoImage from './logo.png';
import searchButtonImage from './searchButton.png';

const UpNavFrame = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  margin-right: 10px;
  display: inline-block;
  background-image: url(${logoImage});
  width: 60px;
  height: 45px;
  background-size: 60px;
  background-repeat: no-repeat;
`;
const NewStoryButton = styled.button`
  background-color: gray;
  color: white;
  width: 140px;
  height: 30px;
  border: 4px solid rgb(220, 220, 220);
  border-radius: 20px;
`;
const SearchInput = styled.input`
  height: 22px;
  width: 30vw;
  min-width: 150px;
  max-width: 400px;
  border: 2px solid rgb(130, 130, 130);
  border-radius: 14px;
  padding-left: 10px;
`;
const SearchButton = styled.div`
  background-image: url(${searchButtonImage});
  background-color: rgb(180, 180, 180);
  border-radius: 14px;
  border: 4px solid rgb(130, 130, 130);
  width: 20px;
  height: 20px;
  margin-left: -24px;
  background-size: 19px;
`;
const LogButton = styled.button`
  margin-left: 5px;
  background-color: gray;
  color: white;
  width: 60px;
  height: 28px;
  border: 4px solid rgb(180, 180, 180);
  border-radius: 10px;
`;

const UpNav = (props) => {
  const state = useSelector((state) => state);
  const { isLogin } = state.userReducer;
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const searchHClickHandler = () => {
    if (title.length === 0) {
      dispatch(messageOpen('검색어를 입력해주세요!'));
      return;
    }
    props.getSearchList(title);
    setTitle('');
  };

  return (
    <Parts.Nav up display={props.display === 'none' ? 'none' : ''}>
      <UpNavFrame>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/newstorycontent">
          <NewStoryButton>Create New Story</NewStoryButton>
        </Link>
      </UpNavFrame>
      <UpNavFrame>
        <SearchInput
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="search"
          value={title}
        />
        <Link to="/search">
          <SearchButton onClick={searchHClickHandler} />
        </Link>
        {isLogin ? (
          <LogButton
            onClick={() => {
              dispatch(userLogout(), dispatch(messageOpen('로그아웃 되었습니다!')));
            }}
          >
            Logout
          </LogButton>
        ) : (
          <LogButton onClick={() => dispatch(modalMoved('Login'))}>Login</LogButton>
        )}
      </UpNavFrame>
    </Parts.Nav>
  );
};

export default withRouter(UpNav);
