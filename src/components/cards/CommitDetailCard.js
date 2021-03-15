import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  commitDetailSaved,
  commitDetailIndexSaved,
  commitDetailTitleSaved,
  commitDetailNicknameSaved,
  commitDetailCreatedSaved,
  commitDetailIsMergedSaved,  
} from '../../actions';

const Card = styled.button`
border-radius: 10px;
width: 80px;
height: 40px;
`;

const CommitDetailCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCard = () => {
    dispatch(commitDetailSaved(props.content));
    dispatch(commitDetailIndexSaved(props.commit_index));
    dispatch(commitDetailTitleSaved(props.title));
    dispatch(commitDetailNicknameSaved(props.nickname));
    dispatch(commitDetailCreatedSaved(props.created));
    dispatch(commitDetailIsMergedSaved(props.merge_check));
    history.push('/commitdetail');
  };

  return (
    <Card className={props.merge_check === 1 ? 'isMerged' : ''}
    onClick={handleCard}
    depth={props.depth}>
      {props.title}
    </Card>
  );
};

export default withRouter(CommitDetailCard);
