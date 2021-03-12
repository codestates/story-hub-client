import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions'
import Parts from '../style/Parts'

const CommitDetailPage = (props) => {
    const state = useSelector((state) => state);
    const { commitDetail, 
        commitDetailIndex,
        commitDetailTitle,
        commitDetailNickname,
        commitDetailCreated, 
    } = state.pageReducer;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleBack = () => {
        history.push("/commit")
    }
    
    useEffect( () => {
        dispatch(pageMoved("CommitDetail"));
    }, [])
    
    return (
        <>
            <div>CommitDetailPage</div>
            <div>
            <button onClick = {handleBack}>back</button>
                <h1> Title : {commitDetailTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
            </div>
            <div>
                Writer : {commitDetailNickname}
                Date : {commitDetailCreated.slice(0, 10)}
            </div>
        </>
    )
}

export default CommitDetailPage;
