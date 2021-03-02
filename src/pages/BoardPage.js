import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../style/Parts'

const BoardPage = (props) => {

    return (
            <>
                <Parts.Board>
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
                </Parts.Board>
                <Parts.Board>
                    <h1>New Story</h1>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                    <Link to='/content'>
                    <button>Temp Board Card</button>
                    </Link>
                </Parts.Board>
            </>
    )
}

export default BoardPage;
