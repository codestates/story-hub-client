import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../../actions';
import styled from 'styled-components';
import Parts from '../../style/Parts'
import cardBackground from '../../images/card.png'

const InfoStyle = styled.div`
height: 85%;
.title {
  font-size: 1.2rem;
  font-weight: 200;
}
.writer {
  margin: 8px 10px 0 10px;
  font-size: 0.9rem;
  font-weight: 900;
}
.writer > span {
  font-weight: 200;
}
.pieces {
  white-space: pre-wrap;
}
h2 {
  text-transform: uppercase;
}
.part {
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 900;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
`;
const InfoFrame = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
height: 100%;
div {
  width: 75%;
}
.frame {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 45%;
  height: 100%;
  padding-top: 10px;
}
.left {
  border-right: 1px solid black;
}
`
const Card = styled.div`
margin: 5px 0 20px 0;
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 3vh 3vw 3vh 3vw;
width: 70%;
height: 90%;
min-height: 20px;
background-size: 100% 100%;
font-size: 0.9rem;
overflow-y: hidden;
.content {
  white-space: pre-wrap;
  overflow-y: hidden;
  overflow-x: hidden;
}
`

const InfoPage = () => {
  const state = useSelector((state) => state);
  const { boardIndex, boardTitle } = state.pageReducer;
  const { accessToken } = state.userReducer;
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
    <Parts.DetailFrame>
      <InfoStyle>
        <h1>Title :
                <span className="title">{boardTitle}</span>
                <div className="writer">Writer : <span>{writer}</span></div>
        </h1>
        <InfoFrame>
          <div className='frame left'>
            <div className="part">- Writer's Info -</div>
            <div>
              <h2>Writer`s comment : </h2>
              <Card style={{height: '12vh'}}>
                <div className="content" style={{height: '13vh'}}>{description}</div>
              </Card>
            </div>
            <div>
              <h2>Other Pieces :</h2>
              <Card style={{height: '18vh'}}>
                <div className="pieces content" style={{height: '17vh'}}> {pieces}</div>
              </Card>
            </div>
          </div>
          <div className='frame'>
            <div className="part">- Commit Rules -</div>
            <div>
              <h2>Commit By : </h2>
              <Card style={{height: '2vh'}}>{option_name}</Card>
            </div>
            <div>
            <h2>Length :</h2>
              <Card style={{height: '3vh'}}>
                <div>Min : {min} <br/> Max : {max}</div>
              </Card>
            </div>
            <div>
              <h2>ETC :</h2>
              <Card style={{height: '11vh'}}>
                <div className="content" style={{height: '10vh'}}>{etc}</div>
              </Card>
            </div>
          </div>
        </InfoFrame>
      </InfoStyle>
    </Parts.DetailFrame>
  );
};

export default InfoPage;
