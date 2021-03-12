import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';
const ContentPage = (props) => {
    const state = useSelector((state) => state);
    const { storyDetail, boardIndex } = state.pageReducer;
    const [boardInfoList, setBoardInfo] = useState([]);
    const dispatch = useDispatch();
    const getTitle = async () => {
      console.log(boardIndex)
      console.log(storyDetail)
        const result = await axios({
            url: 'http://localhost:4000/board/detailcontent',
            method: 'GET',
            params: {
                boardIndex,
            },
        });
        console.log(result.data)
        const { boardInfo } = result.data;
        setBoardInfo(boardInfo);
        
    };
    useEffect(() => {
        getTitle();
        dispatch(pageMoved('StoryDetail'));
    }, []);
    return (
        <>
        <div>ContentPage</div>
        <div dangerouslySetInnerHTML={{ __html: storyDetail }}></div>
        <div>
        {boardInfoList.map((el, idx) => {
            return (
                <div key={idx}>
                    <h1>Title : {el.title}</h1>
                    <div>Nickname : {el.nickname}</div>
                </div>
                );
            })}
        </div>
            <Link to="/newcommit">
                <button>Continue To Write</button>
            </Link>{' '}
        </>
    );
};
export default ContentPage;
