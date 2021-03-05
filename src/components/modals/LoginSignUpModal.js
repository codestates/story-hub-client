import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved } from '../../actions'
import styled from 'styled-components'
import Parts from '../../style/Parts'

const ModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:6;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 2px solid rgb(220,220,220);
  box-shadow: 3px 3px 12px gray;
  padding: 30px 30px 50px 30px;
`
const MoveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.1rem;
  margin-left: -300px;
  margin-top: -30px;
  `
const ModalInput = styled.input`
  width: 200px;
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
  font: 1rem 'Nanum Myeongjo', serif;
`
const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0 30px 0;
`
const InputFrame = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  ${props => props.bottom ? "margin-bottom: 20px;" : "" }
`
const InputTitle = styled.span`
  display: inline-block;
  width: 100px;
  hight: 20px;
  font-size: 0.8rem;
`
const ModalButton = styled.button`
  width: 300px;
  height: ${props => props.thin ? "30px" : "40px"};
  background-color: ${props => props.thin ? "rgb(200,200,200)" : "rgb(150,150,150)"};
  border: 3px solid ${props => props.thin ? "rgb(220,220,220)" : "rgb(170,170,170)"};
  border-radius: 10px;
  margin-top: 10px;
  font: bold ${props => props.thin? "0.9rem" : "1.1rem"} 'Nanum Myeongjo', serif;
  color: white;
`
const TextDiv = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  `

const LoginSignUpModal = (props) => {
  const state = useSelector((state) => state);
  const { modalPage } = state.pageReducer;
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

  const vaildateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const stateInitialize = () => {
    const inputs = document.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) inputs[i].value=""
    setEmail("")
    setPassword("")
    setUsername("")
    setNickname("")
  }
    return (
      <Parts.ModalBackground display={props.display==="none" ? "none" : ""}>
        <ModalFrame>
          {page==='Login' ? 
          <>
            <MoveButton onClick={() => dispatch(modalMoved(""))}>X</MoveButton>
            <ModalTitle>LOGIN</ModalTitle>
            <InputFrame>
              <InputTitle>E-MAIL</InputTitle>
              <ModalInput
                type="email"
                onChange={handleInputValue('email')}
                required
              />
            </InputFrame>
            <InputFrame bottom>
              <InputTitle>PASSWORD</InputTitle>
              <ModalInput
                type="password"
                onChange={handleInputValue('password')}
                required
              />
            </InputFrame>
            <ModalButton>LOGIN</ModalButton>
            <ModalButton thin>Login with GOOGLE</ModalButton>
            <ModalButton thin>Login with KAKAO</ModalButton>
            <ModalButton onClick={() => {setPage("SignUp"), stateInitialize()}}>SIGN UP</ModalButton>
          </>

          : 

          <>
            <MoveButton onClick={() => {setPage("Login", stateInitialize())}}>←</MoveButton>
            <ModalTitle>SIGN UP</ModalTitle>
            <InputFrame>
              <InputTitle>E-MAIL</InputTitle>
              <ModalInput
                type="email"
                onChange={handleInputValue('email')}
                required
              />
            </InputFrame>
            <InputFrame>
              <InputTitle>PASSWORD</InputTitle>
              <ModalInput
                type="password"
                onChange={handleInputValue('password')}
                required
              />
            </InputFrame>
            <InputFrame>
              <InputTitle>USER NAME</InputTitle>
              <ModalInput
                type="username"
                onChange={handleInputValue('username')}
                required
              />
            </InputFrame>
            <InputFrame bottom>
              <InputTitle>NICKNAME</InputTitle>
              <ModalInput
                type="nickname"
                onChange={handleInputValue('nickname')}
                required
              />
            </InputFrame>
            <ModalButton>SUBMIT</ModalButton>
            <TextDiv >OR</TextDiv>
            <ModalButton thin>Sign up with GOOGLE</ModalButton>
            <ModalButton thin>Sign up KAKAO</ModalButton>
          </>
          }
        </ModalFrame>
      </Parts.ModalBackground>
    )
  };
  
  export default LoginSignUpModal;
  