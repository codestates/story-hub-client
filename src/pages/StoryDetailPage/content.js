import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';

const ContentStyle = styled.div`
`;

const ContentPage = (props) => {
    const state = useSelector((state) => state);
    const { storyDetail, boardIndex } = state.pageReducer;
    const [boardInfoList, setBoardInfo] = useState([]);
    const [commitInfoList, setCommitInfo] = useState([]);
    const dispatch = useDispatch();
    const getTitle = async () => {
        const result = await axios({
            url: 'http://localhost:4000/board/detailcontent',
            method: 'GET',
            params: {
                boardIndex,
            },
        });
        const { boardInfo, commitInfo } = result.data;
        setCommitInfo(commitInfo)
        setBoardInfo(boardInfo);
    };

    useEffect(() => {
        getTitle();
        dispatch(pageMoved('StoryDetail'));
    }, []);
    return (
        <ContentStyle>
        <div>ContentPage</div>
        <div>
            <h1>Title : {boardInfoList[0] ? boardInfoList[0].title : ''}</h1>
            <div>Writer : {boardInfoList[0] ? boardInfoList[0].nickname : ''}</div>
        </div>
            Content : <div dangerouslySetInnerHTML={{ __html: storyDetail }}></div>        
        <div>
        {commitInfoList.map((el, idx) => {
            return (
                <div key={idx}>     
                    CommitContent : <div dangerouslySetInnerHTML={{ __html: el.commitContent }}></div>
                    <div> - Nickname : {el.nickname}</div>
                </div>
                );
            })}
        </div>
            <Link to="/newcommit">
                <button>Continue To Write</button>
            </Link>{' '}
        </ContentStyle>
    );
};

export default ContentPage;
                