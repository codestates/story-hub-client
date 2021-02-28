import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CoverPage = (props) => {
    return (
        <>
            <div>CoverPage</div>
            <Link to="/board">
            <button>toBoard</button>
            </Link>
        </>
    )
}

export default CoverPage;
