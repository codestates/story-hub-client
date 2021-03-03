import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoClicked } from '../actions';

const CoverPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <>
            <div>CoverPage</div>
            <Link to="/board">
            <button onClick={() => dispatch(logoClicked(false))}>toBoard</button>
            </Link>
        </>
    )
}

export default CoverPage;
