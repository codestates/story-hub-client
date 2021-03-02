import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoClicked, createClicked } from '../../actions';
import Parts from '../../style/Parts'


const UpNav = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <Parts.Nav up>
            <Link to="/">
            <button onClick={() => dispatch(logoClicked(true))}>Logo</button>
            </Link>
            <Link to="/newstorycontent">
            <button onClick={() => dispatch(createClicked(true))}>Create New Story</button>
            </Link>
            <input type='text' placeholder='search'></input>
            <Link to="/search">
            <button>search</button>
            </Link>
            <button>Login</button>
        </Parts.Nav>
    )
}

export default withRouter(UpNav);
