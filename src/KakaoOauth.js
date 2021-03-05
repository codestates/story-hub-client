import React from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

const KakaoOauth = () => {
  const kakaoLogin = async (token) => {
    const info = await axios({
      method: 'POST',
      url: 'http://localhost:4000/user/kakao',
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    const { loginType } = info.data;
    // token, loginType State 저장해두기!
  };
  return (
    <>
      <KakaoLogin
        token={process.env.REACT_APP_KAKAO_API_KEY}
        onSuccess={(res) => kakaoLogin(res.response.access_token)}
      />
    </>
  );
};

export default KakaoOauth;
