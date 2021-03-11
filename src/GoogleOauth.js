import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, modalMoved, messageOpen } from './actions'
import Background from './images/GoogleLoginButton.png'

const GoogleOauth = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const googleLogin = async (token) => {
    const info = await axios({
      method: 'POST',
      url: 'http://localhost:4000/user/google',
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.loginType) {
        console.log(res);
        dispatch(modalMoved(''));
        dispatch(messageOpen('구글 로그인 완료! :)'));
        dispatch(
          userLogin({
            loginType: res.data.loginType,
            accessToken: token,
          })
        );
      } else dispatch(messageOpen('구글 로그인 실패! :('));
    });
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              width: '300px',
              height: '35px',
              borderRadius: '10px',
              border: '1px solid #e0e0e0',
              marginTop: '10px',
              backgroundImage: `url(${Background})`,
            }}
          />
        )}
        onSuccess={(res) => googleLogin(res.accessToken)}
      />
    </>
  );
};

export default GoogleOauth;
