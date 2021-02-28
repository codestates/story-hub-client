import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpNav = (props) => {
    return (
        <div id="UpNav">
            <Link to="/">
            <button>Logo</button>
            </Link>
            <Link to="/newstorycontent">
            <button>Create New Story</button>
            </Link>
            <input type='text' placeholder='search'></input>
            <Link to="/search">
            <button>search</button>
            </Link>
            <button>Login</button>
        </div>
    )
}

export default UpNav;
