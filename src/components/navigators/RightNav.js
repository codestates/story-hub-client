import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const RightNav = (props) => {
    return (
        <div id="RightNav">
            <Link to="/board">
            <button>Board</button>
            </Link>
            <Link to="/alert">
            <button>Alert</button>
            </Link>
            <Link to="/mypage">
            <button>MyPage</button>
            </Link>
            <Link to="/event">
            <button>Event</button>
            </Link>
        </div>
    )
}

export default RightNav;
