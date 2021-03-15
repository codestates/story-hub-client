import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { modalMoved, commitDetailSaved, commitDetailTitleSaved } from '../../actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components';
import Parts from '../../style/Parts';

const MessageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 8;
  width: 700px;
  height: 200px;
  background-color: white;
  border: 2px solid rgb(220, 220, 220);
  box-shadow: 3px 3px 12px gray;
  padding: 40px 30px 30px 30px;
`;

const EditorStyle = styled.div`
  width: 100%;
  height: 90%;

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
    height: 80%;
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

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.2rem;
    margin: 0px 10px 15px 10px;
  }

  input {
    height: 18px;
    width: 50vw;
    max-width: 350px;
    margin-left: 15px;
    border-radius: 5px;
    padding-left: 10px;
  }
`;
const MessageButton = styled.button`
  width: 230px;
  background-color: transparent;
  font: 1rem 'Nanum Myeongjo', serif;
  border: none;
  border-top: 1px double gray;
  margin-top: 50px;
  padding-top: 20px;
`;

const UpdateBoard = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { accessToken } = state.userReducer;
  const { commitDetailIndex, commitDetail, commitDetailTitle } = state.pageReducer;
  const history = useHistory();
  const [text, setText] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(commitDetail).contentBlocks)
    )
  );

  const onEditorStateChange = (text) => {
    setText(text);
    if (text.getCurrentContent().getPlainText()) {
      dispatch(commitDetailSaved(draftToHtml(convertToRaw(text.getCurrentContent()))));
    } else {
      dispatch(commitDetailSaved(''));
    }
  };

  const handleTitle = (e) => {
    dispatch(commitDetailTitleSaved(e.target.value));
  };

  const handleUpdate = () => {
    console.log('!!');
    axios({
      url: 'http://localhost:4000/commit',
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        commitIndex: commitDetailIndex,
        title: commitDetailTitle,
        content: commitDetail,
      },
    });
    history.push('/commit');
    window.location.reload();
    dispatch(modalMoved(''));
  };

  useEffect(() => {
    dispatch(modalMoved(''));
  }, []);

  return (
    <Parts.ModalBackground message display={props.display === 'none' ? 'none' : ''}>
      <MessageFrame>
        <EditorStyle>
          <div className="title">
            <div>Title </div>
            <input
              placeholder="Please enter a title"
              value={commitDetailTitle}
              onChange={handleTitle}
            />
          </div>
          <Editor
            editorState={text}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              history: { inDropdown: true },
              options: [
                'inline',
                'fontSize',
                'fontFamily',
                'list',
                'textAlign',
                'colorPicker',
                'emoji',
                'history',
              ],
              fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
              },
            }}
            onEditorStateChange={onEditorStateChange}
            placeholder="Please write the commit."
            // localization={{
            //     locale: 'ko'
            // }}
          />
        </EditorStyle>
        <div>Will you definitely update this commit?</div>
        <MessageButton onClick={handleUpdate}>UPDATE</MessageButton>
        <MessageButton onClick={() => dispatch(modalMoved(''))}>CLOSE</MessageButton>
      </MessageFrame>
    </Parts.ModalBackground>
  );
};

export default UpdateBoard;
