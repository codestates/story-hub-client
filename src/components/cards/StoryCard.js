import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ellipsis } from 'polished';
const Card = styled.div`
  font-size: 2vw;
`;

const Content = styled.span`
  ${ellipsis('700px')};
`;
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
    <Card>
      <h2>{props.title}</h2>
      <div>
        {props.nickname}
        <br />
        <Content>{props.content /* 이후에 잘라내줘야함 */}</Content>
        <br />
        {props.up_count}
        <br />
        {props.down_count}
        <br />
        {props.created_at.slice(0, 10)}
      </div>
      <br />
    </Card>
  );
};

export default withRouter(StoryCard);
