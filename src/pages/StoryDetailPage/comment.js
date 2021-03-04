import React, { useState, useEffect } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftDetailNav from '../../components/navigators/LeftDetailNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions'

const CommentPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(pageMoved("StoryDetail"));
    }, [])

    return (
        <>
            <div>CommentPage</div>
        </>
    )
}

export default CommentPage;
