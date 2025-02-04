import React from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import Background from './images/kakao_login_medium_wide.png';
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
    })
      .then((res) => {
        dispatch(modalMoved(''));
        dispatch(messageOpen('카카오 로그인 완료! :)'));
        dispatch(
          userLogin({
            accessToken: res.data.accessToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        return dispatch(messageOpen('카카오 로그인 실패! :('));
      });
  };
  return (
    <KakaoLogin
      token={process.env.REACT_APP_KAKAO_API_KEY}
      onSuccess={(res) => kakaoLogin(res.response.access_token)}
      style={{
        width: '260px',
        height: '30px',
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
