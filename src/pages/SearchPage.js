import React, { useState } from 'react';
import UpNav from '../components/navigators/UpNav'
import RightNav from '../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SearchPage = (props) => {
    return (
        <>
            <UpNav/>
            <div>SearchPage</div>
            <RightNav/>
        </>
    )
}

export default SearchPage;
