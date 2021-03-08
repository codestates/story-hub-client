import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions';
import styled from 'styled-components'
import testImage from '../test.jpeg'


const Book = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
perspective: 1200px;
background: #fffff;

.book {
    transform-style: preserve-3d;
    position: relative;
    height: 60vh;
    cursor: pointer;
    backface-visibility: visible;
}

.front, .back, .page1, .page2, .page3, .page4, .page5, .page6 {
    transform-style: preserve-3d;
    position: absolute;
    width: 50vh;
    height: 100%;
    top: 0; left: 0;
    transform-origin: left center;
    transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
}

.front, .back {
    background: pink;
    width: 51vh;
}

.front, .page1, .page3, .page5 {
    border-bottom-right-radius: .5em;
    border-top-right-radius: .5em;
}

.back, .page2, .page4, .page6 {
    border-bottom-right-radius: .5em;
    border-top-right-radius: .5em;
}

.page1 { 
    background: #efefef;
}

.page2 {
    background: #efefef;
}

.page3 {
    background: #f5f5f5;
}

.page4 {
    background: #f5f5f5;
}

.page5 {
    background-image: url(${testImage});
}

.page6 {
    background-image: url(${testImage});
}

.book:hover .front {
    transform: rotateY(-155deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page1 {
    transform: rotateY(-150deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page2 {
    transform: rotateY(-30deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page3 {
    transform: rotateY(-145deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page4 {
    transform: rotateY(-35deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page5 {
    transform: rotateY(-140deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .page6 {
    transform: rotateY(-40deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.book:hover .back {
    transform: rotateY(-25deg) scale(1.1);
}
`


const CoverPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(pageMoved("Cover"));
    }, [])
    
    return (
        <>
        <Book>
            <div className="book">
            <div className="back"></div>
            <div className="page6">
                <Link to="/board">
                <button>toBoard</button>
                </Link>
            </div>
            <div className="page5"></div>
            <div className="page4"></div>
            <div className="page3"></div>
            <div className="page2"></div>
            <div className="page1"></div>
            <div className="front"></div>
            </div>
        </Book>

        </>
        )
    }
    
    export default CoverPage;
    