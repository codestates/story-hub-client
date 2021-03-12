import React, { useState, useEffect } from 'react';
import UpNav from '../../components/navigators/UpNav';
import LeftDetailNav from '../../components/navigators/LeftDetailNav';
import RightNav from '../../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';

const CommitPage = (props) => {
  const state = useSelector((state) => state);
  const { boardIndex } = state.pageReducer;
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

    setCommitList(result.data.list);
  };

  useEffect(() => {
    dispatch(pageMoved('StoryDetail'));
    getCommitList();
  }, []);

  return (
    <>
      <div>
        {commitList.map((el, idx) => {
          return (
            <div key={idx}>
              <div>{el.title}</div>
              <div>{el.content}</div>
              <div>{el.created_at}</div>
              <hr style={{ border: '1px solid red' }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommitPage;
