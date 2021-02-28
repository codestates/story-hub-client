import React, { useState } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftDetailNav from '../../components/navigators/LeftDetailNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ContentPage = (props) => {
    return (
        <>
            <UpNav/>
            <LeftDetailNav/>
            <div>ContentPage</div>
            <Link to='/newcommit'>
            <button>new commit</button>
            </Link>
            <RightNav/>
        </>
    )
}

export default ContentPage;
