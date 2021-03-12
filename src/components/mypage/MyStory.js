import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import cardBackground from '../../images/card.png'
import { modalMoved, boardIndexSaved } from '../../actions'

const Card = styled.div`
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 10px 0 0 1vw;
width: 45%;
height: 10vh;
min-height: 70px;
background-size: 100% 100%;
font-size: 0.9rem;
display: flex;
flex-direction: column;
justify-content: space-between;
.frame1 {
    padding: 10px 10px 3px 5px;
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
    margin: 2px 0 8px 0;
    padding: 5px 0px 5px 5px;
    font-size: 0.8rem;
}
`;

const MyStory = ({ boardIndex, title, upCount, downCount, createdAt, clickEvent }) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { modalPage } = state.pageReducer;
    
    const [boardInfo, serBoardInfo] = useState([]);
    const [commitInfo, setCommitInfo] = useState([]);
    const [commentInfo, setCommentInfo] = useState([]);
    //   <Card onClick={() => clickEvent(boardIndex)}>
    return (
        <Card onClick={() => {
            dispatch(modalMoved("MyStory"))
            dispatch(boardIndexSaved(boardIndex))
            }}>
            <div className='frame1'>
                <h2 className="title">{title}</h2>
            </div>
            <div className="frame2">
                <div className="counts">
                    <span>{upCount}/ </span>
                    <span>{downCount}</span>
                </div>
                <div className="date">{createdAt.slice(0, 10)}</div>
            </div>
        </Card>
    );
};

export default MyStory;
