import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoClicked, createClicked } from '../../actions';
import Parts from '../../style/Parts'


const UpNav = (props) => {
    return (
        <Parts.Nav up display={props.display==="none" ? "none" : ""}>
            <div>
                <Link to="/">
                <button>Logo</button>
                </Link>
                <Link to="/newstorycontent">
                <button>Create New Story</button>
                </Link>
            </div>
            <div>
                <input type='text' placeholder='search'></input>
                <Link to="/search">
                <button>search</button>
                </Link>
                <button>Login</button>
            </div>
        </Parts.Nav>
    )
}

export default withRouter(UpNav);
