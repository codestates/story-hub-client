import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import { boardIndexSaved, boardTitleSaved, storyDetailSaved } from '../../actions';
import cardBackground from '../../images/card.png'

const Card = styled.div`
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 10px 0 0 5vw;
width: ${props => props.page==='search' ? '35%' : '90%'};
height: 15vh;
min-height: 100px;
background-size: 100% 100%;
font-size: 1rem;
display: flex;
flex-direction: column;
justify-content: space-between;
.frame1 {
    padding: 20px 10px 3px 10px;
    border-bottom: 1px solid black;
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
}
.title {
    font-size: 1.1rem;
    font-weight: bold;
    ${ellipsis('700px')};
}
span {
    display: inline-block;
    font-size: 0.9rem;
}
.frame2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 75%;
    margin: 2px 0 5px 0;
    padding: 5px 10px 5px 10px;
    border-top: 1px solid;
    font-size: 0.9rem;
}
`;

const Content = styled.span`
width: 75%;
margin-top: 2px;
padding: 5px;
${ellipsis('700px')};
`;
const StoryCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCard = () => {
        dispatch(boardIndexSaved(props.board_index))
        dispatch(boardTitleSaved(props.title))
        dispatch(storyDetailSaved(props.storyDetail))
        history.push('/content');
    }

    return (
        <Card page={props.page} onClick = {handleCard}>
            <div className='frame1'>
                <h2 className="title">{props.title}</h2>
                <div className="counts">
                    <span>{props.up_count}</span>
                    <span>{props.down_count}</span>
                </div>
            </div>
            <Content>{props.content}</Content>
            <div className="frame2">
                <div>{props.nickname}</div>
                <div className="date">{props.created_at.slice(0, 10)}</div>
            </div>
        </Card>
        );
    };
    
    export default withRouter(StoryCard);

