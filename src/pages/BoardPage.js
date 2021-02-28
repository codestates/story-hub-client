import React, { useState } from 'react';
import UpNav from '../components/navigators/UpNav'
import RightNav from '../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const BoardPage = (props) => {
    return (
        <>
            <UpNav/>
            <div>BoardPage</div>
            <Link to='/content'>
            <button>Temp Board Card</button>
            </Link>
            <RightNav/>
        </>
    )
}

export default BoardPage;
