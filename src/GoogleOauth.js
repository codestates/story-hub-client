import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const GoogleOauth = () => {
  const googleLogin = async (token) => {
    const info = await axios({
      method: 'POST',
      url: 'http://localhost:4000/user/google',
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    const { loginType } = info.data;
    console.log(loginType);
    // token, loginType State 저장해두기!
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        buttonText="Sign In Google"
        onSuccess={(res) => googleLogin(res.accessToken)}
      />
    </>
  );
};

export default GoogleOauth;
