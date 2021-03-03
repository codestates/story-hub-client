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
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Content", "content"])}>Content</Parts.Button>
            </Link>
            <Link to="/info">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Info", "info"])}>Info</Parts.Button>
            </Link>
            <Link to="/commit">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Commit", "commit"])}>Commit</Parts.Button>
            </Link>
            <Link to="/comment">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Comment", "comment"])}>Comment</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default LeftDetailNav;
