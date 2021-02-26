import React from 'react';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const KakaoOauth = () => {
  const responseKakao = async ({ access_token }) => {
    const result = await axios.post(
      'http://localhost:4000/kakao',
      {
        access_token,
      },
      {
        withCredentials: true,
      }
    );

    // result에는 서버로부터 받은 유저의 정보가 담긴다.
    console.log(result);
  };
  return (
    <>
      <KakaoLogin
        token={process.env.REACT_APP_KAKAO_KEY}
        onSuccess={(res) => responseKakao(res.response)}
        getProfile={true}
      />
    </>
  );
};

export default KakaoOauth;
