import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const LeftDetailNav = (props) => {
    return (
        <div id="LeftDetailNav">
            <Link to="/content">
            <button>content</button>
            </Link>
            <Link to="/info">
            <button>info</button>
            </Link>
            <Link to="/commit">
            <button>commit</button>
            </Link>
            <Link to="/comment">
            <button>comment</button>
            </Link>
        </div>
    )
}

export default LeftDetailNav;
