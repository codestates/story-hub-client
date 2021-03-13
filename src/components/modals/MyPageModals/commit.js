import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved, boardIndexSaved, setMyPageProps } from '../../../actions'
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
    width: 300px;
    height: 420px;
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
    .commitTitle {
        font-weight: 900;
        font-size: 1.1rem;
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
        text-align: center;
        padding-bottom: 5px;
    }
    .content {
        width : 250px;
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
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 90%;
        border-bottom: 3px double black;
    }
    .commentsFrame {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        width: 300px;
        height: 160px;
    }
    .message {
        margin-bottom: 40px;
    }
    .toCommit {
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

const myCommit = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { myPageProps } = state.pageReducer;
    const history = useHistory();
    
    const commitIndex = myPageProps.commitIndex
    const [commentList, setCommentList] = useState([]);

    const getCommentList = async () => {
        const result = await axios({
            url: 'http://localhost:4000/comment/list',
            method: 'GET',
            params: {
                commitIndex,
            },
        });
        setCommentList(result.data.list);
    };

    useEffect(() => {
        getCommentList();
    }, [commitIndex]);

    const html = myPageProps.commitDetail;
    const text = htmlToText(html);

    return (
        <Parts.ModalBackground display={props.display==="none" ? "none" : ""}>
            <ModalFrame>
                <button className="close" onClick={() => {
                    dispatch(modalMoved(""))
                    dispatch(setMyPageProps({}))
                }}>x</button>
                <div className="upCount">{myPageProps.upCount}</div>
                <div className="commitTitle">TITLE : <span>{myPageProps.title}</span></div>
                <div className="content">{text}</div>
                <div className="createdAt">DATE : {myPageProps.createdAt}</div>
                <div className="cardFrame">
                    <h2>Comments</h2>
                    <div className='commentsFrame'>
                        {commentList&&commentList.length > 0 ? (
                            <>
                            {commentList
                                .slice(0,4)
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
                <button className="toCommit" onClick={() => {
                    history.push('/commitdetail')
                    const boardIndex = myPageProps.commitIndex
                    const email = myPageProps.email
                    const result = axios({
                        url: 'http://localhost:4000/commit/detail',
                        method: 'GET',
                        params: {
                            boardIndex,
                            email
                        },
                    }).then(res => console.log(res.data))
                    dispatch(boardIndexSaved(myPageProps.boardIndex))
                    dispatch(modalMoved(""))
                }}>To the Commit</button>
            </ModalFrame>
        </Parts.ModalBackground>
    )
};
        
export default myCommit;
        