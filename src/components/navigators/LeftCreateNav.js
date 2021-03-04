import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../../style/Parts'


const LeftCreateNav = (props) => {
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
            <Link to="/newstorycontent">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Content", "newstorycontent"])}>Content</Parts.Button>
            </Link>
            <Link to="/newstoryinfo">
            <Parts.Button left onClick={setClicked} clicked={isClickedButton(["Info", "newstoryinfo"])}>Info</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default withRouter(LeftCreateNav);
