import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../../style/Parts'


const LeftDetailNav = (props) => {
    return (
        <Parts.Nav left>
            <Link to="/content">
            <Parts.Button left>Content</Parts.Button>
            </Link>
            <Link to="/info">
            <Parts.Button left>Info</Parts.Button>
            </Link>
            <Link to="/commit">
            <Parts.Button left>Commit</Parts.Button>
            </Link>
            <Link to="/comment">
            <Parts.Button left>Comment</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default LeftDetailNav;
