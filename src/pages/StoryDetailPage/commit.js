import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import CommitDetailCard from '../../components/cards/CommitDetailCard';

const CommitPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle } = state.pageReducer;
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
    console.log('삭제하고나선 여기 안들리니??');
    console.log(result.data);
    setCommitList(result.data.list);
  };
  useEffect(() => {
    dispatch(pageMoved('StoryDetail'));
    getCommitList();
  }, []);

  return (
    <>
      <div>
        <h1>{boardTitle}</h1>
        {commitList.length > 0
          ? commitList.map((commit, idx) => {
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
      </div>
    </>
  );
};

export default CommitPage;
