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
            <div className="body">
                <div className="board hotStory">
                    <h1>Hot Story</h1>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                </div>
                <div className="board newStory">
                    <h1>New Story</h1>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                </div>
            </div>
            <RightNav/>
        </>
    )
}

export default BoardPage;
