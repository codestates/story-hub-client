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
import commitimage from '../../images/commit.png'
import { ellipsis } from 'polished';

const Card = styled.button`
font: 400 0.8rem 'Nanum Myeongjo', serif;
width: 100px;
height: 45px;
margin-top: 10px;
padding-top: 5px;
background-color: transparent;
border: none;
background-image: url(${commitimage});
${ellipsis('700px')};
`;

const CommitDetailCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCard = () => {
    if (props.content) dispatch(commitDetailSaved(props.content));
    else dispatch(commitDetailSaved(''));
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
