import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions'
import styled from 'styled-components'

const ContentPage = (props) => {
    const state = useSelector((state) => state);
    const { storyDetail, boardIndex } = state.pageReducer
    const { accessToken, loginType } = state.userReducer;
    const dispatch = useDispatch();

    const detailCommit = async () => {
        const result = await axios({
            url: 'http://localhost:4000/commit/list',
            method: 'GET',
            params : {
                boardIndex
            },
        });
        const { data } = result;
        console.log(data)
    };

    useEffect( () => {
        detailCommit()
        dispatch(pageMoved("StoryDetail"));
    }, [])
    
    return (
        <>
        <div>ContentPage</div>
        <div dangerouslySetInnerHTML ={ {__html: storyDetail} }></div>
        <Link to='/newcommit'>
        <button>Continue To Write</button>
        </Link>        
        </>
        )
    }
    
    export default ContentPage;
    