import axios from 'axios';
import React, { useState } from 'react';

const MyStory = ({ boardIndex, title, upCount, downCount, createdAt }) => {
  const [boardInfo, serBoardInfo] = useState([]);
  const [commitInfo, setCommitInfo] = useState([]);
  const [commentInfo, setCommentInfo] = useState([]);

  const goDetailPage = async () => {
    console.log(boardIndex);
    const result = await axios({
      url: 'http://localhost:4000/board/mypagedetail',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    serBoardInfo(result.data[0]);
    setCommitInfo(result.data[1]);
    setCommentInfo(result.data[2]);
  };

  const test = () => {
    console.log(boardInfo);
    console.log(commitInfo);
    console.log(commentInfo);
  };
  return (
    <div>
      <h1>MyStory</h1>
      <label style={{ border: '1px solid red' }}>
        title : <div>{title}</div>
        upCount : <div>{upCount}</div>
        downCount : <div>{downCount}</div>
        createdAt : <div>{createdAt}</div>
      </label>
      <button onClick={goDetailPage}>버튼</button>
      <button onClick={test}>테스트 버튼</button>
    </div>
  );
};

export default MyStory;
