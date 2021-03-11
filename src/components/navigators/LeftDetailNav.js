import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../../style/Parts'


const LeftDetailNav = (props) => {
    let url = document.location.href.split("/");
    let clicked = url[url.length-1]

    const setClicked = (e) => {
        clicked = e.target.textContent
    } 

    const isClickedButton = (props) => {
        if (props.includes(clicked)) return "clicked"
        else return ""
    }

    return (
        <Parts.Nav left display={props.display==="none" ? "none": ""}>
            <Link to="/content">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Content", "content"])} color="#ffb569cf">Content</Parts.Button>
            </Link>
            <Link to="/info">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Info", "info"])} color="#fff6b8c9">Info</Parts.Button>
            </Link>
            <Link to="/commit">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Commit", "commit"])} color="#95d8d5cf">Commit</Parts.Button>
            </Link>
            <Link to="/comment">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Comment", "comment"])} color="#9695d8cf">Comment</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default withRouter(LeftDetailNav);
