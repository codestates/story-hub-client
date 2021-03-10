import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { messageClose } from '../../actions'
import styled from 'styled-components'
import Parts from '../../style/Parts'

const MessageFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:8;
    width: 250px;
    height: 110 px;
    background-color: white;
    border: 2px solid rgb(220,220,220);
    box-shadow: 3px 3px 12px gray;
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

const Message = (props) => {
    const state = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const { message } = state;

    return (
        <Parts.ModalBackground message display={props.display==="none" ? "none" : ""}>
            <MessageFrame>
                <div>{message}</div>
                <MessageButton onClick={() => dispatch(messageClose())}>CLOSE</MessageButton>
            </MessageFrame>
        </Parts.ModalBackground>
    )
};
        
export default Message;
        