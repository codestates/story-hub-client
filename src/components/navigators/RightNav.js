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
// let clicked = "board"

const RightNav = (props) => {
    let url = document.location.href.split("/");
    let clicked = url[url.length-1]
    const state = useSelector((state) => state);
    const { accessToken } = state.userReducer;

    const setClicked = (e) => {
        clicked = e.target.textContent
    } 

    const isClickedButton = (props) => {
        if (props.includes(clicked)) return "clicked"
        else return ""
    }

    return accessToken ? (
        <Parts.Nav display={props.display==="none" ? "none": ""}>
            <Link to="/board">
            <Parts.Button onClick={setClicked} clicked={isClickedButton(["board", "Board"])} color="#ffeeaad9">Board</Parts.Button>
            </Link>
            <Link to="/alert">
            <Parts.Button onClick={setClicked} clicked={isClickedButton(["alert", "Alert"])} color="#ffa0a0c4">Alert</Parts.Button>
            </Link>
            <Link to="/mypage">
            <Parts.Button onClick={setClicked} clicked={isClickedButton(["mypage", "MyPage"])} color='#95d8a0cf'>MyPage</Parts.Button>
            </Link>
            <Link to="/event">
            <Parts.Button onClick={setClicked} clicked={isClickedButton(["event", "Event"])} color='#aad4ffbd'>Event</Parts.Button>
            </Link>
        </Parts.Nav>
    ) : (
        <Parts.Nav display={props.display==="none" ? "none": ""}>
        <Link to="/board">
        <Parts.Button onClick={setClicked} clicked={isClickedButton(["board", "Board"])} color="#ffeeaad9">Board</Parts.Button>
        </Link>
        <Link to="/event">
        <Parts.Button onClick={setClicked} clicked={isClickedButton(["event", "Event"])} color='#aad4ffbd'>Event</Parts.Button>
        </Link>
    </Parts.Nav>
    )
}

export default withRouter(RightNav);
