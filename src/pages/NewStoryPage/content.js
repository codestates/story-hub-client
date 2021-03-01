import React, { useState } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftCreateNav from '../../components/navigators/LeftCreateNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NewStoryContentPage = (props) => {
    return (
        <>
            <div className="body leftNav">
                <div>NewStoryContentPage</div>
            </div>
        </>
    )
}

export default NewStoryContentPage;
