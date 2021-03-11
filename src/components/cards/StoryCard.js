
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import { boardIndexSaved } from '../../actions';

const Card = styled.div`
font-size: 2vw;
`;

const Content = styled.span`
${ellipsis('700px')};
`;
const StoryCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCard = () => {
        dispatch(boardIndexSaved(props.board_index))
        history.push('/content');
    }

    return (
        <Card onClick = {handleCard}>
            <h2>{props.title}</h2>
            <div>
            {props.nickname}
            <br />
            <Content>{props.content}</Content>
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

