import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { commitDetailSaved,
    commitDetailIndexSaved,
    commitDetailTitleSaved,
    commitDetailNicknameSaved,
    commitDetailCreatedSaved
} from '../../actions';

const Card = styled.div`
font-size: 2vw;
`;

const CommitDetailCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCard = () => {
        dispatch(commitDetailSaved(props.content))
        dispatch(commitDetailIndexSaved(props.commit_index))
        dispatch(commitDetailTitleSaved(props.title))
        dispatch(commitDetailNicknameSaved(props.nickname))
        dispatch(commitDetailCreatedSaved(props.created))        
        history.push('/commitdetail');
    }

    return (
        <Card onClick = {handleCard}>
            <button>{props.title}</button>
        </Card>
        );
    };
    
    export default withRouter(CommitDetailCard);
