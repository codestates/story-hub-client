import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const StoryCard = (props) => {
    // const state = useSelector((state) => state);
    // const dispatch = useDispatch();
  
    // useEffect(() => {}, []);
  
    // const handleMoveDetailPage = (id) => {
    //   if (state.userReducer.users[0].boardId.includes(id)) {
    //     dispatch(checkLike(true));
    //   } else if(!state.userReducer.users[0].boardId.includes(id)) {
    //     dispatch(checkLike(false));
    //   }
    //   dispatch(getBoardDetail(id));
    //   props.history.push('/boarddetail');
    // };
  
    // onClick={() => handleMoveDetailPage(props.id)}
    return (
        
        <div>
        <h2>{props.title}</h2>
            <div>
            {props.nickname}
            <br />
            {props.content/* 이후에 잘라내줘야함 */}
            <br /> 
            {props.up_count} 
            <br />
            {props.down_count} 
            <br />
            {props.created_at} 
            </div>
            <br />
        </div>
    );
  };
  
  export default withRouter(StoryCard);