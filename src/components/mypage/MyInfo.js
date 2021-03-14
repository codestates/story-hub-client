import React, { useState, useEffect, useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import cardBackground from '../../images/card.png';
import { userUpdate } from '../../actions';

const Frame = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 3px double rgba(0, 0, 0, 0.5);
  height: 40px;
  margin-left: 1vw;
  h1 {
    border: none;
    width: 90%;
    position: relative;
  }
  button {
  }
`;

const ButtonWrap = styled.div`
  button {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #2aad9bc2;
    padding: 2px;
    transition: all 0.5s ease-out;
    background: linear-gradient(
      270deg,
      #7cd6b1bd,
      #2dd6a7bd,
      rgba(34, 34, 34, 0),
      rgba(34, 34, 34, 0)
    );
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    border: 2px solid #45c5babd;
    border-radius: 5px;
    font: 900 0.6rem serif;
  }

  button:hover {
    color: #fff;
    border: 2px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

const Card = styled.div`
  background-image: url(${cardBackground});
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  padding: 20px 0 3vh 5vw;
  width: 30vw;
  height: 20vh;
  min-width: 220px;
  min-height: 80px;
  background-size: 100% 100%;
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  span,
  input,
  .nickname > div {
    font-weight: 400;
  }
  .nickname {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
  }
  input {
    margin-left: 5px;
    width: 100%;
    background-color: #fff8ed2b;
    border-radius: 5px;
    font: bold 0.8rem 'Nanum Myeongjo', serif;
  }
`;

const MyInfo = ({ myInfo, setAccessToken }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginType, accessToken } = state.userReducer;
  const [checkBtn, setCheckBtn] = useState(false);
  const [nickName, setNickName] = useState(myInfo.nickname);

  useEffect(() => {
    myInfoFc();
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
    if(data)setNickName(data.nickname);
  };

  const handleInputValue = (e) => {
    setNickName(e.target.value);
  };

  const handleNickNameChange = async () => {
    setCheckBtn((prevCheckbtn) => (prevCheckbtn ? false : true));
    console.log(nickName);
    if (checkBtn === true) {
      if (nickName) {
        const result = await axios({
          url: 'http://localhost:4000/user',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            loginType: loginType,
            nickname: nickName,
          },
          withCredentials: true,
        });
        setAccessToken(result.data.accessToken);
      } else {
        setCheckBtn(true);
        dispatch(messageOpen('닉네임을 입력해주세요!'));
      }
    }
  };

  return (
    <>
      <Frame>
        <h1>My Info</h1>
        <ButtonWrap>
          <button id="change" onClick={handleNickNameChange}>
            CHANGE
            <br />
            NICKNAME
          </button>
        </ButtonWrap>
      </Frame>
      <Card>
        <div>
          E-MAIL : <span>{myInfo.email}</span>
        </div>
        <div className="nickname">
          NICKNAME :
          {checkBtn ? (
            <input type="text" onChange={handleInputValue} value={nickName} />
          ) : (
            <div>{nickName ? nickName : myInfo.nickname}</div>
          )}
        </div>
        <div>
          USER NAME : <span>{myInfo.userName}</span>
        </div>
      </Card>
    </>
  );
};

export default MyInfo;
