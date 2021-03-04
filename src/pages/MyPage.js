import React, { useState, useEffect } from 'react';
import UpNav from '../components/navigators/UpNav'
import RightNav from '../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions'
import Parts from '../style/Parts'


const MyPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(pageMoved("MyPage"));
    }, [])

    return (
        <>
            <div>MyPage</div>
        </>
    )
}

export default MyPage;
