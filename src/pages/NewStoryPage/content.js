import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, contentSaved } from '../../actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components'

const EditorStyle = styled.div`
    width: 100%;
    height: 50vw;

    .wrapperClassName{
        width: 100%;
        height: 80%;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
    .editorClassName{
        font-size: 2vw;
        white-space: pre-wrap;
        width: 100%;
        display: block;
        border: 1px solid white !important;
        padding: 5px !important;
        border-radius: 2px !important;
        background-color: white;
    }
` 

const NewStoryContentPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const {content} = state.textReducer
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

    // const handleNextButton = () => {}

    // document.getElementsByTagName('textarea').focus()
        
    useEffect( () => {
        dispatch(pageMoved("NewStory"));
        // Too many re-renders 는 화살표함수로 바꿔주면 해결된다.
    }, [])

    return (
        <EditorStyle>
            <Editor
                editorState={text}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar = {{
                    list: {inDropdown: true},
                    textAlign : {inDropdown: true},
                    history : {inDropdown: true},
                    options: ['inline', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'emoji', 'history'],
                    
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
