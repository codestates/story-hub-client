import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ellipsis } from 'polished';
import styled from 'styled-components'
import cardBackground from '../../images/card.png'

const Card = styled.div`
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 10px 0 0 3vw;
width: 80%;
height: 15vh;
min-height: 50px;
background-size: 100% 100%;
font-size: 0.9rem;
display: flex;
flex-direction: column;
justify-content: space-evenly;
.frame1 {
    padding: 3px 10px 3px 5px;
    border-bottom: 1px solid black;
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
}
.title {
    font-size: 1rem;
    font-weight: bold;
    ${ellipsis('700px')};
}
span {
    display: inline-block;
    font-size: 0.8rem;
}
.frame2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 85%;
    border-top: 1px solid black;
    margin: 2px 0 8px 0;
    padding: 5px 0px 5px 5px;
    font-size: 0.8rem;
}
`;


const CommitCard = ({
  commitIndex,
  title,
  content,
  nickname,
  createdAt,
  upCount,
  downCount,
  visitCount,
  alertCheck,
}) => {

  return (
    <Card onClick={() => alertCheck(commitIndex, 'commit')}>
        <div className='frame1'>
            <h2 className="title">{title}</h2>
            <div>{nickname}</div>
        </div>
        <div className="content">{content}</div>
        <div className="frame2">
            <div className="counts">
                <span>{upCount}/ </span>
                <span>{downCount}</span>
                <span>{visitCount}</span>
            </div>
            <div className="date">{createdAt}</div>
        </div>
    </Card>
  );
};

export default CommitCard;
