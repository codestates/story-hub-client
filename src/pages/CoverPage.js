import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions';
import styled, { keyframes } from 'styled-components'
import coverImage from '../images/coverImg.png'
import page1 from '../images/page1.png'
import page2 from '../images/page2.png'


const Book = styled.div`
background-size: cover;
background-position: 50% 50%;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
perspective: 1200px;
background: #fffff;

.book {
    animation-duration: 3s;
    animation-name: slidein;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transform-style: preserve-3d;
    position: relative;
    height: 55vh;
    backface-visibility: visible;
}

.front, .back, .page1, .page2, .page3, .page4, .page5, .page6 {
    border-radius: 5px;
    transform-style: preserve-3d;
    position: absolute;
    width: 45vh;
    height: 100%;
    top: 0; left: 0;
    transform-origin: left center;
    transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
}

.front, .back {
    border: 2px solid #6565652b;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
    background-image: url(${coverImage});
    background-position: 50% 50%;
    background-size: 45vh;
    width: 46vh;
    height: 57vh;
    margin-top: -1vh;
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
    background-image: url(${page1});
    background-position: 50% 50%;
    background-size: 60vh;
}

.page6 {
    background-image: url(${page2});
    background-position: 50% 50%;
    background-size: 60vh;
}

.book:hover .front {
    transform: rotateY(-155deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page1 {
    transform: rotateY(-150deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page2 {
    transform: rotateY(-30deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page3 {
    transform: rotateY(-145deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page4 {
    transform: rotateY(-35deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page5 {
    transform: rotateY(-140deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
}

.book:hover .page6 {
    transform: rotateY(-40deg) scale(1.1);
    box-shadow: 0 1em 3em 0 rgba(255, 255, 255, .3);
    cursor: pointer;
}

.book:hover .back {
    transform: rotateY(-25deg) scale(1.1);
}
`
const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.2; }
    100% { opacity: 1; }
`
const Button = styled.button`
    display: ${props => props.display==="none" ? "none" : ""};
    border: none;
    background-color: transparent;
    font: bold 7vh 'Nanum Myeongjo', serif;
    position: absolute;
    top: 43%;
    left: 85%;
    animation: ${blink} 1.5s infinite both;
    cursor: pointer;
`



const CoverPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(pageMoved("Cover"));
    }, [])
    
    return (
        <Book>
            <div className="book">
                <div className="back" />
                <Link to="/board">
                <div className="page6">
                    <Button>></Button>
                </div>
                </Link>
                <div className="page5" />
                <div className="page4" />
                <div className="page3" />
                <div className="page2" />
                <div className="page1" />
                <div className="front" />
            </div>
        </Book>
        )
    }
    
    export default CoverPage;
    