import React, { useState, useEffect } from 'react';
import UpNav from '../../components/navigators/UpNav'
import LeftDetailNav from '../../components/navigators/LeftDetailNav'
import RightNav from '../../components/navigators/RightNav'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions'

const ContentPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const fakeHtml = `<p><span style="font-size: 30px;"><strong><em>이것은 Fake</em></strong></span></p>`
    
    useEffect( () => {
        dispatch(pageMoved("StoryDetail"));
    }, [])
    
    return (
        <>
        <div>ContentPage</div>
            <div dangerouslySetInnerHTML ={ {__html: fakeHtml} }></div>
            <Link to='/newcommit'>
            <button>new commit</button>
            </Link>        
        </>
        )
    }
    
    export default ContentPage;
    