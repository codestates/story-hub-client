import React, { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parts from '../../style/Parts'

// 초기 객체 {Board : "clicked", A: "", M: "", E:""}
// 객체를 저장한다. => 스테이트
// 객체의 키 값을 넣어준다. ex) <Parts.Button state.Board>Board</Parts.Button>
// <Parts.Button state.A>Alert</Parts.Button>
// 특정 버튼이 클릭되면(온클릭) 스테이트를 바꿔준다.
// ex) A 클릭 시 객체를 {B : "", A: "clicked", M: "", E:""}
const RightNav = (props) => {

    return (
        <Parts.Nav>
            <Link to="/board">
            <Parts.Button >Board</Parts.Button>
            </Link>
            <Link to="/alert">
            <Parts.Button >Alert</Parts.Button>
            </Link>
            <Link to="/mypage">
            <Parts.Button >My Page</Parts.Button>
            </Link>
            <Link to="/event">
            <Parts.Button >Event</Parts.Button>
            </Link>
        </Parts.Nav>
    )
}

export default withRouter(RightNav);
