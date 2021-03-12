import React from 'react';
import styled from 'styled-components';
import cardBackground from '../../images/card.png'

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
span {
  font-weight: 400;
}
`;

const MyInfo = ({ myInfo }) => {
  return (
    <Card>
      <div>E-MAIL : <span>{myInfo.email}</span></div>
      <div>NICKNAME : <span>{myInfo.nickname}</span></div>
      <div>USER NAME : <span>{myInfo.userName}</span></div>
    </Card>
  );
};

export default MyInfo;
