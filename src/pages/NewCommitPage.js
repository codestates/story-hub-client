import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, commitSaved, commitTitleSaved, messageOpen } from '../actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled, { keyframes } from 'styled-components'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.2; }
    100% { opacity: 1; }
`

const EditorStyle = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;

  .toolbarClassName {
    border: none;
    background-color: #fff8eda1;
  }

  .rdw-option-wrapper {
    border: none;
    background-color: #fff8eda1;
  }

  .rdw-dropdown-selectedtext {
    border: none;
    background-color: #fff8eda1;
  }

  .wrapperClassName {
    width: 100%;
    height: 75%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editorClassName {
    white-space: pre-wrap;
    width: 100%;
    display: block;
    border: 1px solid white !important;
    padding: 5px !important;
    border-radius: 2px !important;
    background-color: #fff8eda1;
  }

  span {
    display: inline-block;
    max-width: 100%;
    white-space: break-spaces;
  }

.upperFrame {
    height: 110%;
}
.back {
    animation: ${blink} 1.5s infinite both;
    cursor: pointer;
    margin: -25px auto 5px -15px;
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    font-weight: 900;

}
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
.bottomFrame {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.rules {
    font-weight: 900;
}
span {
    font-size: 0.9rem;
    font-weight: 400;
}
` 
const ButtonWrap = styled.div`
  button {
    width: 30vw;
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 2vh;
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

const NewCommitPage = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { commit, commitTitle } = state.textReducer;
  const { boardIndex } = state.pageReducer;
  const { accessToken } = state.userReducer;
  const history = useHistory();
  const [text, setText] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(commit).contentBlocks)
    )
  );
  const [option_name, setOptionName] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [etc, setEtc] = useState();

  const detailSmallInfo = async () => {
    const result = await axios({
      url: 'http://localhost:4000/board/detailinfo',
      method: 'GET',
      params: {
        boardIndex,
      },
    });
    const { data } = result;
    if (data) {
      setOptionName(data[1][0].option_name);
      setMin(data[1][0].min_length);
      setMax(data[1][0].max_length);
      setEtc(data[1][0].etc);
    }
  };

  const onEditorStateChange = (text) => {
    setText(text);
    if (text.getCurrentContent().getPlainText()) {
      dispatch(commitSaved(draftToHtml(convertToRaw(text.getCurrentContent()))));
    } else {
      dispatch(commitSaved(''));
    }
  };

  const handleTitle = (e) => {
    dispatch(commitTitleSaved(e.target.value));
  };

  const handleBack = () => {
    history.push('/content');
  };

  const handleSubmit = () => {
    if (commitTitle && commit) {
      axios({
        url: 'http://localhost:4000/commit/create',
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          title: commitTitle,
          content: commit,
          boardIndex: boardIndex,
        },
      }).then((res) => {
        if (res.data.message === 'OK') {
          dispatch(commitSaved(''));
          dispatch(commitTitleSaved(''));
          history.push('/content');
        }
      });
    } else {
      dispatch(messageOpen('제목과 내용은 필수입력사항입니다.'));
      return;
    }
  };
  
    useEffect( () => {
        detailSmallInfo()
        dispatch(pageMoved("NewCommit"));
    }, [])
    
    return (
        <EditorStyle>
            <div className='upperFrame'>
                <button className='back' onClick = {handleBack}>←</button>
                <div className = "title">
                    <div>TITLE : </div>
                    <input className="titleInput" placeholder="Please enter a title" value = {commitTitle} onChange = {handleTitle}/>
                </div>
                <Editor
                editorState={text}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar = {{
                    list: {inDropdown: true},
                    textAlign : {inDropdown: true},
                    history : {inDropdown: true},
                    options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'emoji', 'history'],
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
                    },
                }}
                onEditorStateChange={onEditorStateChange}
                placeholder="Please write the commit." />
            </div>
            <div className='bottomFrame'>
                <div className='rules'>
                    <div>COMMIT BY : <span>{option_name}</span></div>
                    <div>MIN : <span>{min} BYTES</span></div>
                    <div>MAX : <span>{max} BYTES</span></div>
                    <div>ETC : <span>{etc}</span></div>
                </div>
                <ButtonWrap>
                    <button className='submit' onClick={handleSubmit}>Submit</button>
                </ButtonWrap>
            </div>
        </EditorStyle>
        )
    }
    
    export default NewCommitPage;
    