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
import background from '../../../images/note.png'

const ModalFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 335px;
    height: 450px;
    background-color: transparent;
    background-image: url(${background});
    background-size: 100%;
    padding: 10px;
    font-size: 0.9rem;
    .close {
        align-self: start;
        margin: 25px 0 -35px 10px;
        background-color: transparent;
        font-weight: 400;
        font-size: 1.5rem;
        border: none;
    }
    .upCount {
        margin: -10px 20px 0 auto;
    }
    .commitTitle {
        margin-top: 30px;
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
        width : 220px;
        height: 35px;
        margin: 10px;
        font-size: 0.8rem;
        background-color: #fff8eda1;
        border: 1px solid rgba(255,0,0,0.3);
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
const ButtonWrap = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 10px;
  button {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 3px;
    transition: all 0.5s ease-out;
    background: linear-gradient(
      270deg,
      rgba(223, 190, 106, 0.8),
      rgba(146, 111, 52, 0.8),
      rgba(34, 34, 34, 0),
      rgba(34, 34, 34, 0)
    );
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    border: 3px solid rgba(223, 190, 106, 1);
    border-radius: 5px;
    font: 900 0.8rem serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

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
                <ButtonWrap>
                    <button className="toCommit" onClick={() => {
                    // const boardIndex = myPageProps.commitIndex
                    // const email = myPageProps.email
                    // const result = axios({
                    //     url: 'http://localhost:4000/commit/detail',
                    //     method: 'GET',
                    //     params: {
                    //         boardIndex,
                    //         email
                    //     },
                    // }).then(res => console.log(res.data))
                    dispatch(boardIndexSaved(myPageProps.boardIndex))
                    dispatch(modalMoved(""))
                    history.push('/content')
                    }}>To the Story</button>
                </ButtonWrap>
            </ModalFrame>
        </Parts.ModalBackground>
    )
};
        
export default myCommit;
        