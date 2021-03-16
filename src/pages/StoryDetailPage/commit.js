import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, commitMaxDepthSaved } from '../../actions';
import styled from 'styled-components'
import CommitDetailCard from '../../components/cards/CommitDetailCard';
import Parts from '../../style/Parts'
import merged from '../../images/merged.png'

const CommitDetailFrame = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;

`
const CommitsFrame = styled.div`
width: 90%;
height: 90%;
display: flex;
flex-direction: row;
overflow-x: auto;
overflow-y: auto;
.table{
  font-size: 0.8rem;
  font-weight: 900;
}
.table > div {
  height: 25px;
  text-align: center;
  padding-top: 50px;
}
`
const CommitsPerDepth = styled.div`
width: 130px;
display: flex;
flex-direction: column;
align-items: center;
margin-left: 30px;
.isMerged{
  padding-top: 10px;
  background-image: url(${merged});
  background-color: transparent;
  border: none;
  width: 110px;
  height: 80px;
  order: -1;
}
h2 {
  order: -1;
  width: 80%;
  text-align: center;
  font-weight: 700;
  border-bottom: 1px solid gray;
}
`

const CommitPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle, commitMaxDepth } = state.pageReducer;
  const dispatch = useDispatch();

  const [commitList, setCommitList] = useState([]);

  const getCommitList = async () => {
    const result = await axios({
      url: 'http://localhost:4000/commit/list',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    const data = result.data.list
    setCommitList(data);
    if (data[0].depth > commitMaxDepth) dispatch(commitMaxDepthSaved(data[0].depth))
    
  };
  
  const depthArrMaker = () => {
    if (commitMaxDepth !== 0 ) {
      const depthCheckArr = []
      for (let i = 1; i <= commitMaxDepth; i++){
        depthCheckArr.push(i)
      }
    }
  }

  const commitsMaker = () => {
        const depthArr = []
        for (let i = 1; i <= commitMaxDepth; i++){
          depthArr.push(i)
        }
    const commits = depthArr.map((depth, idx) => {
      return(
          <CommitsPerDepth key={idx} depth={depth}>
            {depth===commitMaxDepth ?
            <>
              <h2>DEPTH: {depth}</h2> 
              <div style={{
                height:'44px',
                paddingTop:'44px',
                font: '100 0.8rem serif'}}>EMPTY</div>
            </>
            :
            <h2>DEPTH: {depth}</h2> 
            }
            
            {commitList.length > 0
              ? commitList.map((commit, idx) => {
                if(commit.depth===commitMaxDepth && commit.merge_check===1){
                  dispatch(commitMaxDepthSaved(commit.depth+1))
                }
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
    return commits
  } 
  

  useEffect(() => {
    dispatch(pageMoved('StoryDetail'));
    getCommitList();
    depthArrMaker();
  }, []);
  console.log(commitMaxDepth)
  return (
    <>
      <Parts.DetailFrame>
        <h1>{boardTitle}</h1>
        <CommitsFrame>
          <div className="table">
            <div>MERGED:</div>
            <div>COMMITS:</div>
          </div>
          {commitsMaker()}
        </CommitsFrame>
      </Parts.DetailFrame>
    </>
  );
};

export default CommitPage;
