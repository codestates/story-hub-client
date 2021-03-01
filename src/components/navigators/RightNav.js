import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button'



const RightNav = (props) => {
    return (
        <div id="RightNav">
            <Link to="/board">
            <Button>Board</Button>
            </Link>
            <Link to="/alert">
            <Button>Alert</Button>
            </Link>
            <Link to="/mypage">
            <Button>My Page</Button>
            </Link>
            <Link to="/event">
            <Button>Event</Button>
            </Link>
        </div>
    )
}

export default RightNav;
