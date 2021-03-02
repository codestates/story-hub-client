import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../../style/Parts'


const LeftCreateNav = (props) => {
    return (
        <Parts.Nav left>
            <Link to="/newstorycontent">
            <Parts.Button left>Content</Parts.Button>
            </Link>
            <Link to="/newstoryinfo">
            <Parts.Button left>Info</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default LeftCreateNav;
