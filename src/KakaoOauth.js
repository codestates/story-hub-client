import React from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import Background from './kakao_login_medium_wide.png';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, modalMoved, messageOpen } from './actions';

const KakaoOauth = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const kakaoLogin = async (token) => {
    const info = await axios({
      method: 'POST',
      url: 'http://localhost:4000/user/kakao',
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.loginType) {
        console.log(res);
        dispatch(modalMoved(''));
        dispatch(messageOpen('카카오 로그인 완료! :)'));
        dispatch(
          userLogin({
            loginType: res.data.loginType,
            accessToken: token,
          })
        );
      } else dispatch(messageOpen('카카오 로그인 실패! :('));
    });
  };
  return (
    <KakaoLogin
      token={process.env.REACT_APP_KAKAO_API_KEY}
      onSuccess={(res) => kakaoLogin(res.response.access_token)}
      style={{
        width: '300px',
        height: '35px',
        borderRadius: '10px',
        backgroundImage: `url(${Background})`,
        marginTop: '10px',
        border: 'none',
        color: 'transparent',
      }}
    />
  );
};
export default KakaoOauth;
