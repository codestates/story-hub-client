import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

require('dotenv').config();

function GooglOauth() {
  const googleLogin = (access_token) => {
    console.log(access_token);
    // axios.post(
    //   'http://localhost:4000/kakao',
    //   {
    //     access_token,
    //   },
    //   { withCredentials: true }
    // );
  };

  return (
    <div>
      <h1>Oauth Test</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        buttonText="Sign In Google"
        onSuccess={(res) => googleLogin(res.accessToken)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GooglOauth;
