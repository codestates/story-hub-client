import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userSignup, modalMoved, messageOpen } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts';
import GoogleOauth from '../../GoogleOauth';
import KakaoOauth from '../../KakaoOauth';

const ModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 6;
  width: 300px;
  height: 330px;
  background-color: white;
  border: 2px solid rgb(220, 220, 220);
  box-shadow: 3px 3px 12px gray;
  padding: 30px 30px 50px 30px;
`;
const MoveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.1rem;
  margin-left: -300px;
`;
const ModalInput = styled.input`
  width: 200px;
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
  font: 1rem 'Nanum Myeongjo', serif;
`;
const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0 30px 0;
`;
const InputFrame = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  ${(props) => (props.bottom ? 'margin-bottom: 20px;' : '')}
`;
const InputTitle = styled.span`
  display: inline-block;
  width: 100px;
  hight: 20px;
  font-size: 0.8rem;
`;
const ModalButton = styled.button`
  width: 300px;
  height: ${(props) => (props.thin ? '30px' : '40px')};
  background-color: ${(props) => (props.thin ? 'rgb(200,200,200)' : 'rgb(150,150,150)')};
  border: 3px solid ${(props) => (props.thin ? 'rgb(220,220,220)' : 'rgb(170,170,170)')};
  border-radius: 10px;
  margin-top: 10px;
  font: bold ${(props) => (props.thin ? '0.9rem' : '1.1rem')} 'Nanum Myeongjo', serif;
  color: white;
`;

const LoginSignUpModal = (props) => {
  const state = useSelector((state) => state);
  const { modalPage } = state.pageReducer;
  const { user, isLogin, accessToken } = state.userReducer;
  const dispatch = useDispatch();

  const [page, setPage] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  const handleInputValue = (key) => (e) => {
    if (key === 'email') {
      setEmail(e.target.value);
    }
    if (key === 'password') {
      setPassword(e.target.value);
    }
    if (key === 'username') {
      setUsername(e.target.value);
    }
    if (key === 'nickname') {
      setNickname(e.target.value);
    }
  };

  const loginRequestHandler = async () => {
    await axios
      .post(
        'http://localhost:4000/user/login',
        {
          email: email,
          password: password,
        },
        {
          'Content-Type': 'application/json',
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          userLogin({
            accessToken: res.data.accessToken,
          })
        );
        dispatch(modalMoved(''));
        stateInitialize();
        dispatch(messageOpen('스토리 허브에 오신 것을 환영합니다! :)'));
      })
      .catch((err) => {
        if (err) dispatch(messageOpen('입력 정보를 다시 확인해주세요!'));
      });
  };

  const signupRequestHandler = async () => {
    await axios
      .post(
        'http://localhost:4000/user/signup',
        {
          email: email,
          password: password,
          userName: username,
          nickname: nickname,
        },
        {
          'Content-Type': 'application/json',
          withCredentials: true,
        }
      )
      .then((res) => {
        loginRequestHandler();
        dispatch(modalMoved(''));
        stateInitialize();
        setPage('Login');
      })
      .catch((err) => {
        if (err) dispatch(messageOpen('입력 정보를 다시 확인해주세요!'));
      });
  };

  const vaildateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const stateInitialize = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setNickname('');
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) inputs[i].value = '';
  };
  return (
    <Parts.ModalBackground display={props.display === 'none' ? 'none' : ''}>
      <ModalFrame>
        {page === 'Login' ? (
          <>
            <MoveButton
              onClick={() => {
                dispatch(modalMoved('')), stateInitialize();
              }}
            >
              X
            </MoveButton>
            <ModalTitle>LOGIN</ModalTitle>
            <InputFrame>
              <InputTitle>E-MAIL</InputTitle>
              <ModalInput type="email" onChange={handleInputValue('email')} required />
            </InputFrame>
            <InputFrame bottom>
              <InputTitle>PASSWORD</InputTitle>
              <ModalInput type="password" onChange={handleInputValue('password')} required />
            </InputFrame>
            <ModalButton
              onClick={() => {
                loginRequestHandler();
              }}
            >
              LOGIN
            </ModalButton>
            {/* <ModalButton thin>Login with GOOGLE</ModalButton>
            <ModalButton thin>Login with KAKAO</ModalButton> */}
            <KakaoOauth />
            <GoogleOauth />
            <ModalButton
              onClick={() => {
                setPage('SignUp'), stateInitialize();
              }}
            >
              SIGN UP
            </ModalButton>
          </>
        ) : (
          <>
            <MoveButton
              onClick={() => {
                setPage('Login'), stateInitialize();
              }}
            >
              ←
            </MoveButton>
            <ModalTitle>SIGN UP</ModalTitle>
            <InputFrame>
              <InputTitle>E-MAIL</InputTitle>
              <ModalInput type="email" onChange={handleInputValue('email')} required />
            </InputFrame>
            <InputFrame>
              <InputTitle>PASSWORD</InputTitle>
              <ModalInput type="password" onChange={handleInputValue('password')} required />
            </InputFrame>
            <InputFrame>
              <InputTitle>USER NAME</InputTitle>
              <ModalInput type="username" onChange={handleInputValue('username')} required />
            </InputFrame>
            <InputFrame bottom>
              <InputTitle>NICKNAME</InputTitle>
              <ModalInput type="nickname" onChange={handleInputValue('nickname')} required />
            </InputFrame>
            <ModalButton
              onClick={() => {
                signupRequestHandler();
              }}
            >
              SUBMIT
            </ModalButton>
          </>
        )}
      </ModalFrame>
    </Parts.ModalBackground>
  );
};

export default LoginSignUpModal;
