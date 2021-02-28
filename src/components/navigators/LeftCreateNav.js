import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const LeftCreateNav = (props) => {
    return (
        <div id="LeftCreateNav">
            <Link to="/newstorycontent">
            <button>content</button>
            </Link>
            <Link to="/newstoryinfo">
            <button>info</button>
            </Link>
        </div>
    )
}

export default LeftCreateNav;
