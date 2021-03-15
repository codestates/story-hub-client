import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved } from '../../actions'
import styled from 'styled-components'
import Parts from '../../style/Parts'
import { useHistory } from 'react-router-dom';
import background from '../../images/note2.png'

const MessageFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:8;
    height: 110 px;
    background-image: url(${background});
    background-size: 105% 105%;
    background-position: 50% 50%;
    padding: 40px 30px 30px 30px;
`
const MessageButton = styled.button`
    width: 230px;
    background-color: transparent;
    font: 1rem 'Nanum Myeongjo', serif;
    border: none;
    border-top: 1px double gray;
    margin-top: 30px;
    padding-top: 20px;
`

const Merge = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { accessToken, loginType } = state.userReducer;
    const { commitDetailIndex  } = state.pageReducer;
    const history = useHistory();

    const handleAccept = () => {
        axios({
            url: 'http://localhost:4000/commit/merge',
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                loginType,
                commitIndex : commitDetailIndex
            },
        })
        dispatch(modalMoved(""))
        history.push("/commit")
    }

    return (
        <Parts.ModalBackground message display={props.display==="none" ? "none" : ""}>
            <MessageFrame>
                <div>Will you definitely merge this commit?</div>
                <MessageButton onClick={handleAccept}>ACCEPT</MessageButton>
                <MessageButton onClick={() => dispatch(modalMoved(""))}>CLOSE</MessageButton>
            </MessageFrame>
        </Parts.ModalBackground>
    )
};
        
export default Merge;