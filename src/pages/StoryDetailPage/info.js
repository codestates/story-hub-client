import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';

const InfoStyle = styled.div`
  .pieces {
    white-space: pre-wrap;
  }
`; // 줄바꿈

const InfoPage = () => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle } = state.pageReducer;
  const { accessToken, loginType } = state.userReducer;
  const [writer, setWriter] = useState();
  const [description, setDescription] = useState();
  const [option_name, setOptionName] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [etc, setEtc] = useState();
  const [pieces, setPieces] = useState();
  const dispatch = useDispatch();

  const detailInfo = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/detailinfo',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    const { data } = result;
    if (data) {
      setWriter(data[0][0].nickname);
      setDescription(data[0][0].description);
      setOptionName(data[1][0].option_name);
      setMin(data[1][0].min_length);
      setMax(data[1][0].max_length);
      setEtc(data[1][0].etc);
      handlePieces(data);
    }
  };

  const handlePieces = (data) => {
    let cnt = 0;
    let res = '\n';
    for (let el of data[2]) {
      res += `${cnt + 1}. ${el.title} \n`;
      cnt++;
    }
    setPieces(res);
  };

  useEffect(() => {
    detailInfo();
    dispatch(pageMoved('StoryDetail'));
  }, []);

  return (
    <InfoStyle>
      <div>InfoPage</div>
      <h1>{boardTitle}</h1>
      <div>
        <div>Writer : {writer}</div>
        <div>Writer`s comment : {description}</div>
        <div className="pieces">Writer`s Other Pieces : {pieces}</div>
      </div>
      <div>
        Commit Rules
        <div>Commit By : {option_name}</div>
        <div>
          Length :<div>Min : {min}</div>
          <div>Max : {max}</div>
        </div>
        <div>ETC : {etc}</div>
      </div>
    </InfoStyle>
  );
};

export default InfoPage;
