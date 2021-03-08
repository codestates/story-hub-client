import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions';

const CoverPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(pageMoved("Cover"));
    }, [])

    return (
        <>
            <div>CoverPage</div>
            <Link to="/board">
            <button>toBoard</button>
            </Link>
        </>
    )
}

export default CoverPage;
