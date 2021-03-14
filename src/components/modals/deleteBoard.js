import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts';
import { useHistory } from 'react-router-dom';

const MessageFrame = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
z-index: 8;
width: 250px;
height: 110 px;
background-color: white;
border: 2px solid rgb(220, 220, 220);
box-shadow: 3px 3px 12px gray;
padding: 40px 30px 30px 30px;
`;
const MessageButton = styled.button`
width: 230px;
background-color: transparent;
font: 1rem 'Nanum Myeongjo', serif;
border: none;
border-top: 1px double gray;
margin-top: 30px;
padding-top: 20px;
`;

const DeleteBoard = (props) => {
    const state = useSelector((state) => state);
    const { accessToken, loginType } = state.userReducer;
    const { boardIndex } = state.pageReducer;
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleAccept = () => {
        axios({
            url: 'http://localhost:4000/board',
            method: 'DELETE',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                loginType: loginType,
                boardIndex: boardIndex,
            },
        });
        dispatch(modalMoved(''));
        history.push('/board');
    };
    
    return (
        <Parts.ModalBackground message display={props.display === 'none' ? 'none' : ''}>
            <MessageFrame>
                <div>Will you definitely delete this board?</div>
                <MessageButton onClick={handleAccept}>ACCEPT</MessageButton>
                <MessageButton onClick={() => dispatch(modalMoved(''))}>CLOSE</MessageButton>
            </MessageFrame>
        </Parts.ModalBackground>
        );
    };
    
    export default DeleteBoard;
    