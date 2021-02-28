import React, { useState } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftDetailNav from '../../components/navigators/LeftDetailNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const InfoPage = (props) => {
    return (
        <>
            <UpNav/>
            <LeftDetailNav/>
            <div>InfoPage</div>
            <RightNav/>
        </>
    )
}

export default InfoPage;
