import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved, setMyPageProps } from '../../../actions'
import Parts from '../../../style/Parts'
import styled from 'styled-components'
import { ellipsis } from 'polished';
import { htmlToText } from 'html-to-text';
import cardBackground from '../../../images/card.png'


const ModalFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 400px;
    height: 500px;
    background-color: white;
    border: 2px solid rgb(220,220,220);
    box-shadow: 3px 3px 12px gray;
    padding: 10px;
    font-size: 0.9rem;
    .close {
        align-self: start;
        margin-bottom: -10px;
        background-color: transparent;
        font-weight: 400;
        font-size: 1.5rem;
        border: none;
    }
    .upCount {
        margin: -10px 20px 0 auto;
    }
    .storyTitle {
        font-weight: 900;
        font-size: 1.1rem;
        margin-left: -120px;
    }
    span {
        font-weight: 300;
        ${ellipsis('700px')};
    }
    h2 {
        margin-top: 10px;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 1rem;
        border-bottom: 1px solid black;
        width: 140px;
    }
    .content {
        width : 300px;
        height: 35px;
        margin: 10px;
        font-size: 0.8rem;
        background-color: rgb(220,220,220);
        border-radius: 20px;
        padding: 15px;
        white-space: normal;
        overflow-y: hidden;
    }
    .createdAt {
        border-bottom: 3px double black;
        width: 90%;
        text-align: right;
        padding-bottom: 3px;
    }
    .cardFrame {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 90%;
        border-bottom: 3px double black;
    }
    .commitsFrame, .commentsFrame {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 200px;
        height: 280px;
    }
    .commitsFrame {
        padding-right: 10px;
        border-right: 3px double black;
    }
    .commentsFrame {
        margin-left: 15px;
    }
    .message {
        margin-top: 40%;
    }
    .toStory {
        margin: auto 0 7px 0;
        width: 80%;
        height: 50px;
        border-radius: 15px;
    }
    .card {
        width: 120px;
        height: 50px;
        margin: 10px;
        background-image: url(${cardBackground});
        background-color: transparent;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        padding: 10px 0 0 1vw;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .underline {
        border-bottom: 1px solid black;
        padding-bottom: 5px;
        margin-bottom: 5px;
        width: 90%;
        ${ellipsis('700px')};
    }
    .bottom {
        margin-bottom: 5px;
        text-align: right;
        padding-right: 10px;
    }
`

const myStory = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { myPageProps } = state.pageReducer;
    const history = useHistory();
    const boardIndex = myPageProps.boardIndex

    const [commitList, setCommitList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const getCommitList = async () => {
        const result = await axios({
            url: 'http://localhost:4000/commit/list',
            method: 'GET',
            params: {
                boardIndex,
            },
        });
        setCommitList(result.data.list);
    };

    const getCommentList = async () => {
        const result = await axios({
            url: 'http://localhost:4000/comment/list',
            method: 'GET',
            params: {
                boardIndex,
            },
        });
        setCommentList(result.data.list);
    };

    useEffect(() => {
        getCommitList();
        getCommentList();
    }, [boardIndex]);

    const html = myPageProps.storyDetail;
    const text = htmlToText(html);
    

    return (
        <Parts.ModalBackground display={props.display==="none" ? "none" : ""}>
            <ModalFrame>
                <button className="close" onClick={() => {
                    dispatch(modalMoved(""))
                    dispatch(setMyPageProps({}))
                }}>x</button>
                <div className="upCount">{myPageProps.upCount}</div>
                <div className="storyTitle">TITLE : <span>{myPageProps.title}</span></div>
                <div className="content">{text}</div>
                <div className="createdAt">DATE : {myPageProps.createdAt}</div>
                <div className="cardFrame">
                    <div className='commitsFrame'>
                        <h2>Commits</h2>
                        {commitList&&commitList.length > 0 ? (
                            <>
                            {commitList
                                .slice(0,3)
                                .map((commitBoard, idx) => {      
                                return (
                                    <div className='card' key={idx}>
                                        <div className="underline">{commitBoard.title}</div>
                                        <div className="bottom">{commitBoard.created_at.slice(0, 10)}</div>
                                    </div>
                                );
                                })}
                            </>
                            )
                            : 
                            <div className="message">No Commits</div>
                            }
                    </div>
                    <div className='commentsFrame'>
                        <h2>Comments</h2>
                        {commentList&&commentList.length > 0 ? (
                            <>
                            {commentList
                                .slice(0,3)
                                .map((commentBoard, idx) => {           
                                return (
                                    <div className='card' key={idx}>
                                        <div className="underline">{commentBoard.content}</div>
                                        <div className="bottom">{commentBoard.created_at.slice(0, 10)}</div>
                                    </div>
                                );
                                })}
                            </>
                            )
                            : 
                            <div className="message">No Comments</div>
                            }
                    </div>
                </div>
                <button className="toStory" onClick={() => {
                    history.push('/content')
                    dispatch(modalMoved(""))
                }}>To the Story</button>
            </ModalFrame>
        </Parts.ModalBackground>
    )
};
        
export default myStory;
        