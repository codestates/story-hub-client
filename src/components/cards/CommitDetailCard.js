import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { commitDetailSaved,
    commitDetailIndexSaved,
    commitDetailTitleSaved,
    commitDetailNicknameSaved,
    commitDetailCreatedSaved,
    commitDetailIsMergedSaved
} from '../../actions';

const Card = styled.div`
font-size: 2vw;

.isMerged {
    background-color: blue;
}
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
        dispatch(commitDetailIsMergedSaved(props.merge_check))        
        history.push('/commitdetail');
    }


    console.log(props.merge_check)
    return (
        <Card onClick = {handleCard}>
            <div className = {props.merge_check==="1" ? "isMerged" : ""}>
                <button>{props.title}</button>
            </div>
        </Card>
        );
    };
    
    export default withRouter(CommitDetailCard);
