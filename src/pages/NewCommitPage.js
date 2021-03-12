import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    pageMoved, 
    commitSaved, 
    commitTitleSaved, 
    messageOpen 
} from '../actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const EditorStyle = styled.div`
width: 100%;
height: 90%;

.toolbarClassName{
    border: none;
    background-color: #fff8eda1;
}

.rdw-option-wrapper{
    border: none;
    background-color: #fff8eda1;
}

.rdw-dropdown-selectedtext{
    border: none;
    background-color: #fff8eda1;
}

.wrapperClassName{
    width: 100%;
    height: 80%;
    margin: 0 auto;
    margin-bottom: 4rem;
}

.editorClassName{
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
` 

const NewCommitPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const {commit, commitTitle} = state.textReducer
    const { boardIndex } = state.pageReducer
    const { accessToken, loginType } = state.userReducer;
    const history = useHistory();
    const [text, setText] = 
    useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(commit).contentBlocks)))
    
    const onEditorStateChange = (text) => {
        setText(text);              
        if(text.getCurrentContent().getPlainText()) {
            dispatch(commitSaved(draftToHtml(convertToRaw(text.getCurrentContent()))));
        }
        else {
            dispatch(commitSaved(''))
        }
    }
    
    const handleTitle = (e) => {
        dispatch(commitTitleSaved(e.target.value))
    }
    
    const handleBack = () => {
        history.push("/content")
    }
    
    const handleSubmit = () => {
        if (commitTitle && commit ) {
                axios({
                    url: 'http://localhost:4000/commit/create',
                    method: 'POST',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        loginType,
                        title: commitTitle,
                        content: commit,
                        boardIndex: boardIndex
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
            dispatch(pageMoved("NewCommit"));
        }, [])
        
        return (
            <EditorStyle>
            <div className = "title">
            <button onClick = {handleBack}>back</button>
            <div>Title </div>
            <input placeholder="Please enter a title" value = {commitTitle} onChange = {handleTitle}/>
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
            placeholder="Please write the commit."
            />
            <button onClick={handleSubmit}>Submit</button>
            </EditorStyle>
            )
        }
        
        export default NewCommitPage;
        