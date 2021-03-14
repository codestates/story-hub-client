import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalMoved,
  userLogout,
  messageOpen,
  categorySaved,
  commentSaved,
  commitbySaved,
  maxSaved,
  minSaved,
  etcSaved,
  contentTitleSaved,
  contentSaved,
  commitSaved,
  commitTitleSaved,
} from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts';
import logoImage from '../../images/story_hub_logo.png';
import logoImage2 from '../../images/story_hub_logo2.png';
import searchButtonImage from '../../images/searchButton.png';
import searchButtonImage2 from '../../images/searchButton2.png';
import configureStore from '../../store/store';

const { persistor } = configureStore();

const UpNavFrame = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  margin: 2px 10px 0 30px;
  display: inline-block;
  background-image: url(${logoImage});
  width: 100px;
  height: 60px;
  background-repeat: no-repeat;
  transition: all 0.5s ease-out;
  :hover {
    background-image: url(${logoImage2});
  }
`;
const SearchInput = styled.input`
  height: 25px;
  width: 30vw;
  min-width: 150px;
  max-width: 400px;
  background-color: #fff8ed2b;
  color: white;
  padding-left: 10px;
  border: 2px solid rgba(223, 190, 106, 0.6);
  border-right: none;
  border-radius: 5px 0px 0px 5px;
  font: bold 0.8rem 'Nanum Myeongjo', serif;

  ::placeholder {
    color: #fff8ed6b;
  }
`;
const SearchButton = styled.div`
  button {
    background-image: url(${searchButtonImage});
    background-repeat: no-repeat;
    background-color: transparent;
    border: 3px solid rgba(223, 190, 106, 0.6);
    border-radius: 0px 5px 5px 0px;
    width: 31px;
    height: 31px;
    margin-left: -1px;
    transition: all 0.5s ease-out;
  }
  button:hover {
    color: #fff;
    border: 3px solid #ceb154;
    background-image: url(${searchButtonImage2});
    color: $white;
  }
`;

const ButtonWrap = styled.div`
  button {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(223, 190, 106, 1);
    padding: 7px 10px 7px;
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
    border: 3px solid rgba(223, 190, 106, 0.6);
    border-radius: 5px;
    font: bold 0.7rem 'Nanum Myeongjo', serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

const UpNav = (props) => {
  const state = useSelector((state) => state);
  const { isLogin, accessToken } = state.userReducer;
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');

  const searchHClickHandler = () => {
    if (title.length === 0) {
      dispatch(messageOpen('검색어를 입력해주세요!'));
      return;
    }
    props.getSearchList(title);
    setTitle('');
  };

  const handleCreate = () => {
    if(accessToken) history.push('newstorycontent')
    else dispatch(messageOpen('로그인이 필요합니다.'))
  }

  return (
    <Parts.Nav up display={props.display === 'none' ? 'none' : ''}>
      <UpNavFrame>
        <Link to="/">
          <Logo />
        </Link>
        <ButtonWrap>
            <button onClick = {handleCreate}>Create New Story</button>
        </ButtonWrap>
      </UpNavFrame>
      <UpNavFrame>
        <SearchInput
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="search"
          value={title}
        />
        <Link to="/search">
          <SearchButton>
            <button onClick={searchHClickHandler} />
          </SearchButton>
        </Link>
        {isLogin ? (
          <ButtonWrap>
            <button
              onClick={async () => {
                dispatch(
                  userLogout(),
                  dispatch(messageOpen('로그아웃 되었습니다!')),
                  // dispatch(categorySaved('')),
                  // dispatch(commitbySaved('')),
                  // dispatch(commitSaved('')),
                  // dispatch(commitTitleSaved('')),
                  // dispatch(contentSaved('')),
                  // dispatch(contentTitleSaved('')),
                  // dispatch(commentSaved('')),
                  // dispatch(etcSaved('')),
                  // dispatch(minSaved(0)),
                  // dispatch(maxSaved(0)),
                  await persistor.purge(),
                  history.push('/')
                );
              }}
            >
              Logout
            </button>
          </ButtonWrap>
        ) : (
          <ButtonWrap>
            <button onClick={() => dispatch(modalMoved('Login'))}>Login</button>
          </ButtonWrap>
        )}
      </UpNavFrame>
    </Parts.Nav>
  );
};

export default withRouter(UpNav);
