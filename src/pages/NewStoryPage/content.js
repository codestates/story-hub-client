import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, contentSaved, contentTitleSaved } from '../../actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components'

const EditorStyle = styled.div`
    width: 100%;
    height: 90%;
    margin: 15px;

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
` 

const NewStoryContentPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const {content, contentTitle} = state.textReducer
    const [text, setText] = 
        useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(content).contentBlocks)))
        
        const onEditorStateChange = (text) => {
        setText(text);              
        if(text.getCurrentContent().getPlainText()) {
            dispatch(contentSaved(draftToHtml(convertToRaw(text.getCurrentContent()))));
        }
        else {
            dispatch(contentSaved(''))
        }
        // let lines = document.getElementsByClassName('public-DraftStyleDefault-ltr')
        // lines[lines.length-1].focus()
    }

    const handleTitle = (e) => {
        dispatch(contentTitleSaved(e.target.value))
    }

    // document.getElementsByTagName('textarea').focus()
        
    useEffect( () => {
        dispatch(pageMoved("NewStory"));
        // Too many re-renders 는 화살표함수로 바꿔주면 해결된다.
    }, [])

    return (
        <EditorStyle>
            <div className = "title">
                <div>TITLE : </div>
                <input className='titleInput' placeholder="Please enter a title" value = {contentTitle} onChange = {handleTitle}/>
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
                placeholder="Please start the story."
                // localization={{
                //     locale: 'ko'
                // }}
            />
        </EditorStyle>
    )
}

export default NewStoryContentPage;
