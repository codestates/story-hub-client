import React, { useState, useEffect } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftCreateNav from '../../components/navigators/LeftCreateNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions'

const NewStoryInfoPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(pageMoved("NewStory"));
    }, [])

    return (
        <>
            <div>NewStoryInfoPage</div>
        </>
    )
}

export default NewStoryInfoPage;
