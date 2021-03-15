import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, commitMaxDepthSaved } from '../../actions';
import styled from 'styled-components'
import CommitDetailCard from '../../components/cards/CommitDetailCard';

const CommitDetailFrame = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`
const CommitsFrame = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;

`
const CommitsPerDepth = styled.div`
display: flex;
flex-direction: column;
.isMerged{
  width: 80px;
  height: 80px;
  background-color: gray;
  color: white;
  order: -1;
}
`

const CommitPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle, commitMaxDepth } = state.pageReducer;
  const dispatch = useDispatch();

  const [commitList, setCommitList] = useState([]);
  const [depthArr, setDepthArr] = useState([]);

  const getCommitList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/commit/list',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    setCommitList(result.data.list);

    if (commitMaxDepth !== 0 ) {
      const depthArr = []
      for (let i = 1; i <= commitMaxDepth; i++){
        depthArr.push(i)
      }
      setDepthArr(depthArr)
    }

    result.data.list.map((commit) => {
      console.log([commit.depth, commitMaxDepth])
      if(commit.depth > commitMaxDepth) dispatch(commitMaxDepthSaved(commit.depth))
    })
  };
  useEffect(() => {
    dispatch(pageMoved('StoryDetail'));
    getCommitList();
  }, []);
  
  return (
    <>
      <CommitDetailFrame>
        <h1>{boardTitle}</h1>
        <CommitsFrame>
        {depthArr.length > 0
        ? depthArr.map((depth, idx) => {
          return(
            <CommitsPerDepth key={idx} depth={depth}>
              {commitList.length > 0
                ? commitList.map((commit, idx) => {
                  if(commit.depth === depth)
                  return (
                    <CommitDetailCard
                      key={idx}
                      commit_index={commit.commit_index}
                      title={commit.title}
                      content={commit.content}
                      created={commit.created_at}
                      nickname={commit.nickname}
                      depth={commit.depth}
                      merge_check={commit.merge_check}
                    />
                  );
                })
              : ''}
            </CommitsPerDepth>
          )
        })
        : ""}
        </CommitsFrame>
      </CommitDetailFrame>
    </>
  );
};

export default CommitPage;
