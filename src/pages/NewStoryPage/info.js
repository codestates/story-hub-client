import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import cardBackground from '../../images/card.png'
import checkMark from '../../images/redcircle.png'

import {
  pageMoved,
  categorySaved,
  commentSaved,
  commitbySaved,
  maxSaved,
  minSaved,
  etcSaved,
  contentTitleSaved,
  messageOpen,
  contentSaved,
} from '../../actions';
import Parts from '../../style/Parts';

const InfoStyle = styled.div`
width: 100%;
height: 100%;
margin: 15px;
display: flex;
flex-direction: column;
align-items: center;

.title {
  width: 99%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  margin: 0px 10px 15px 10px;
  font-weight: 900;
}

.titleInput {
  height: 25px;
  width: 100%;
  margin-left: 15px;
  border-radius: 5px;
  padding-left: 10px;
  background-color: #fff8eda1;
  font: 1rem 'Nanum Myeongjo', serif;
}

h2 {
  margin: 10px 10px 10px 0; 
  font-weight: 900;
  font-size: 1.2rem;
}

h3 {
  margin-bottom: 10px;
  font-weight: 900;
  font-size: 1rem;
}

input, textarea {
  font: 0.8rem 'Nanum Myeongjo', serif;
  height: 15px;
  padding: 0 5px 0 5px; 
  background-color: #fff8eda1;
  border-radius: 5px;
  border: 1px solid #fff8eda1; 
}
textarea {
  width: 95%;
  height: 85%;
  overflow-y: auto;
}

span {
  display: inline-block;
  width: 50px;
  margin: 5px;
  font-size: 0.8rem;
}
.min, .max {
  width: 40%;
}
`;
const InfoFrame = styled.div`
width: 90%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
.frame {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.section {
  min-width: 200px;
}
.category {
  width: 80%;
  min-height: 80px;
  height: 15%;
  margin-bottom : 13vh;
}
.comment {
  width: 80%;
  height: 50%;
  margin-bottom : 7vh;
}
.commitBy {
  min-height: 80px;
  height: 15%;
  margin-bottom : 4vh;
}
.length {
  height: 15%;
  margin-bottom : 4vh;
}
.etc {
  height: 25vh;
}
.rules {
  width: 100%;
  height: 90%;
}
`
const Info = styled.div`
background-image: ${props => props.clicked==="clicked" ? `url(${checkMark})` : ""};
background-size: cover;
background-repaeat: no-repeat;
background-position: 50% 50%;
margin:0;
height: 18px;
padding-top: 10px;
width: 70px;
color: black;
text-align: center;
font-size: 0.8rem;

:hover {
  cursor: pointer;
}
`

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
margin: 5px 0 50px 0;
background-image: url(${cardBackground});
background-color: transparent;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
padding: 4vh 3vw 3vh 3vw;
width: 90%;
height: 70%;
min-height: 20px;
background-size: 100% 100%;
font-size: 0.9rem;
.selectionFrame {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
`

const ButtonWrap = styled.div`
width: 110%;
margin-top: 1vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
  button {
    width: 100%;
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 1.5vh;
    transition: all 0.5s ease-out;
    background: linear-gradient(
      270deg,
      rgba(223, 190, 106, 0.8),
      rgba(146, 111, 52, 0.8),
      rgba(34, 34, 34, 0),
      rgba(34, 34, 34, 0)
    );
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    margin: 0.625rem;
    border: 3px solid rgba(223, 190, 106, 0.8);
    border-radius: 5px;
    font: 900 1rem serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

const NewStoryInfoPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { category, comment, commitBy, max, min, etc } = state.infoReducer;
  const { accessToken, loginType } = state.userReducer;
  const { content, contentTitle } = state.textReducer;

  const setCategory = (e) => {
    dispatch(categorySaved(e.target.textContent));
  };

  const isCategoryButton = (props) => {
    if (props === category) return 'clicked';
    else return '';
  };

  const setCommit = (e) => {
    dispatch(commitbySaved(e.target.textContent));
  };

  const isCommitButton = (props) => {
    if (props === commitBy) return 'clicked';
    else return '';
  };

  const handleTitle = (e) => {
    dispatch(contentTitleSaved(e.target.value));
  };

  const handleComment = (e) => {
    dispatch(commentSaved(e.target.value));
  };

  const handleEtc = (e) => {
    dispatch(etcSaved(e.target.value));
  };

  const handleMin = (e) => {
    dispatch(minSaved(e.target.value));
  };

  const handleMax = (e) => {
    dispatch(maxSaved(e.target.value));
  };

  const handleSubmit = () => {
    if (
      category &&
      comment &&
      commitBy &&
      max &&
      min /*&& etc*/ &&
      content &&
      contentTitle &&
      max - min > 0
    ) {
      axios({
        url: 'http://localhost:4000/board/create',
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          loginType,
          title: contentTitle,
          content: content,
          optionName: commitBy,
          category: category,
          minLength: min,
          maxLength: max,
          description: comment,
          etc: etc,
        },
      }).then((res) => {
        if (res.data.message === 'OK') {
          dispatch(categorySaved(''));
          dispatch(commitbySaved(''));
          dispatch(contentTitleSaved(''));
          dispatch(contentSaved(''));
          dispatch(commentSaved(''));
          dispatch(etcSaved(''));
          dispatch(minSaved(0));
          dispatch(maxSaved(0));
          history.push('/board');
        }
      });
    } else {
      dispatch(messageOpen('입력이 안되었거나 잘못입력된 부분이 있습니다.'));
      return;
    }
  };

  useEffect(() => {
    dispatch(pageMoved('NewStory'));
  }, []);

  return (
    <InfoStyle>
      <div className="title">
        <div>Title </div>
        <input className='titleInput' placeholder="Please enter a title" value={contentTitle} onChange={handleTitle} />
      </div>
      <InfoFrame>
        <div className='frame'>
          <div className="category section">
            <h2>CATEGOTY OF STORY</h2>
            <Card>
              <div className='selectionFrame'>
                  <Info onClick={setCategory} clicked={isCategoryButton('ESSAY')}>
                    ESSAY
                  </Info>
                  <Info onClick={setCategory} clicked={isCategoryButton('NOVEL')}>
                    NOVEL
                  </Info>
                  <Info onClick={setCategory} clicked={isCategoryButton('POETRY')}>
                    POETRY
                  </Info>
                </div>
                <div className='selectionFrame'>
                <Info onClick={setCategory} clicked={isCategoryButton('SCENARIO')}>
                  SCENARIO
                </Info>
                <Info onClick={setCategory} clicked={isCategoryButton('FREE')}>
                  FREE
                </Info>
              </div>
            </Card>
          </div>
          <div className="comment section">
            <h2>WRITER'S COMMENT</h2>
            <Card>
              <textarea placeholder="Please enter a comment" value={comment} onChange={handleComment} />
            </Card>
          </div>
        </div>
        <div className='frame'>
          <div className="rules">
            <h2>COMMIT RULES</h2>
            <div className="commitBy section">
              <Card>
                <h3>COMMIT BY :</h3>
                <div className='selectionFrame'>
                  <Info onClick={setCommit} clicked={isCommitButton('CHAPTER')}>
                    CHAPTER
                  </Info>
                  <Info onClick={setCommit} clicked={isCommitButton('INCIDENT')}>
                    INCIDENT
                  </Info>
                </div>
                <div className='selectionFrame'>
                  <Info onClick={setCommit} clicked={isCommitButton('SCENE')}>
                    SCENE
                  </Info>
                  <Info onClick={setCommit} clicked={isCommitButton('FREE')}>
                    FREE
                  </Info>
                </div>
              </Card>
            </div>
            <div className='length section'>
              <Card>
                <h3>LENGTH :</h3>
                <div>
                  <span>MIN :</span>
                  <input className='min' value={min} onChange={handleMin} />
                  <span>BYTES</span>
                </div>
                <div>
                  <span>MAX :</span>
                  <input className='max' value={max} onChange={handleMax} />
                  <span>BYTES</span>
                </div>
              </Card>
            </div>
            <div className='etc section'>
              <Card>
                <h3>ETC :</h3>
                <textarea placeholder="Please enter a etc" value={etc} onChange={handleEtc} />
              </Card>
            </div>
            <ButtonWrap>
              <button onClick={handleSubmit}>Submit</button>
            </ButtonWrap>
          </div>
        </div>
      </InfoFrame>
    </InfoStyle>
  ); // Submit <Link to="/board"> 제출이 안되는 조건이면 보드로 가선 안됨 아니면 보드로 일단은 가지만 제출이 안됐다는 메세지를 띄운다??
};

export default NewStoryInfoPage;
