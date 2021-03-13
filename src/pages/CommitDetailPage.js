import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved, modalMoved } from '../actions'
import Parts from '../style/Parts'

const CommitDetailPage = (props) => {
    const state = useSelector((state) => state);
    const {
        boardIndex,
        commitDetail, 
        commitDetailIndex,
        commitDetailTitle,
        commitDetailNickname,
        commitDetailCreated,
        commitDetailIsMerged,
    } = state.pageReducer;
    const history = useHistory();
    const dispatch = useDispatch();
    const { accessToken, loginType } = state.userReducer;
    const [isWriter, setIsWriter] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
    const checkMergeDeleteButton = async () => {
        const result = await axios({
            url: 'http://localhost:4000/board/info',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                loginType,
            },
        });
        const { data } = result;
        if(data){
            data.map(el => {
                if(el.board_index === boardIndex){
                    setIsWriter(true)
                    setIsDelete(true)
                    if(commitDetailIsMerged === '1') {
                        setIsWriter(false)
                        setIsDelete(false)
                    }
                }
            })
        }
        
        const resultDelete = await axios({
            url: 'http://localhost:4000/commit/info',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                loginType,
            },
        });        
        if(resultDelete.data){
            resultDelete.data.map(el => {
                if(el.commit_index === commitDetailIndex){
                    setIsDelete(true)
                }
            })
        }
    };

    
    const handleBack = () => {
        history.push("/commit")
    }
    
    const handleMerge = () => {
        dispatch(modalMoved("Merge"))
    }
    const handleDelete = () => {
        dispatch(modalMoved("DeleteCommit"))
    }
    
    useEffect( () => {
        console.log(commitDetailIsMerged)
        checkMergeDeleteButton()
        dispatch(pageMoved("CommitDetail"));
    }, [])

    
    return (
        <>
        <div>CommitDetailPage</div>
        <div>
        <button onClick = {handleBack}>back</button>
        <h1> Title : {commitDetailTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: commitDetail }}></div>
        </div>
        <div>
        Writer : {commitDetailNickname}
        Date : {commitDetailCreated.slice(0, 10)}
        </div>
        <Parts.Button display={isWriter ? "" : "none"} onClick = {handleMerge}>Merge</Parts.Button>
        <Parts.Button display={isDelete ? "" : "none"} onClick = {handleDelete}>Delete</Parts.Button>
        </>
        )
    }
    
    export default CommitDetailPage;
    