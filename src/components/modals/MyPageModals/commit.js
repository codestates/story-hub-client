import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved } from '../../../actions'
import Parts from '../../../style/Parts'
import styled from 'styled-components'


const MessageFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:8;
    min-width: 250px;
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

const myCommit = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <Parts.ModalBackground message display={props.display==="none" ? "none" : ""}>
            <MessageFrame>
                <div>commit here!</div>
                <button onClick={() => dispatch(modalMoved(""))}>x</button>
            </MessageFrame>
        </Parts.ModalBackground>
    )
};
        
export default myCommit;
        