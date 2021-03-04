import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions'
import Parts from '../style/Parts'

const BoardPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(pageMoved("Board"));
    }, [])
    
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
