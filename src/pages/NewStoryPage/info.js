import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import { pageMoved, categorySaved, commentSaved, commitbySaved, maxSaved, minSaved, etcSaved, contentTitleSaved, } from '../../actions'
import Parts from '../../style/Parts'

const InfoStyle = styled.div `
    .disabled {
        display : none;
    }
`

// button {
//     background-color: ${props => props.clicked==="clicked" ? "rgb(185, 185, 185)" : "gray"};
// }


const NewStoryInfoPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const {category, comment, commitBy, max, min, etc} = state.infoReducer
    const {content, contentTitle} = state.textReducer
    // const [submit, setSubmit] = useState({
    //     category: false, comment: false, commitBy: false, max: false, min: false, content: false, contentTitle : false
    // })
    let submitClassName = "disabled"
    // console.log([category, comment, commitBy, max, min, content, contentTitle])
    // const chk = () => {
    //     console.log(submitClassName)
    //     if(submit.category) submitClassName = ''
    //     console.log(submitClassName)
    // }

    const setCategory = (e) => {
        dispatch(categorySaved(e.target.textContent))
        // chk()
    } 

    const isCategoryButton = (props) => {
        if (props === category) return "clicked"
        else return ""
    }

    const setCommit = (e) => {
        dispatch(commitbySaved(e.target.textContent))
        // chk()
    } 

    const isCommitButton = (props) => {
        if (props === commitBy) return "clicked"
        else return ""
    }    

    const handleTitle = (e) => {
        dispatch(contentTitleSaved(e.target.value))
        // chk()
    }

    const handleComment = (e) => {
        dispatch(commentSaved(e.target.value))
        // chk()
    }

    const handleEtc = (e) => {
        dispatch(etcSaved(e.target.value))
        // chk()
    }

    const handleMin = (e) => {
        dispatch(minSaved(e.target.value))
        // chk()
    }

    const handleMax = (e) => {
        dispatch(maxSaved(e.target.value))
        // chk()
    }

    const handleSubmit = () => {
        if(category && comment && commitBy && max && min /*&& etc*/ && content && contentTitle && max - min > 0) {
            axios({
                url: 'http://localhost:4000/board/create',
                method: 'POST',
                withCredentials: true,
                data: {
                    title : contentTitle,
                    content : content,
                    commitBy : commitBy,
                    category : category,
                    min_length : min,
                    max_length : max,
                    comment : comment,
                    etc : etc
                }
            }).then((res) => {
                if(res.message === 'OK') {
                    dispatch(categorySaved(''))
                    dispatch(commitbySaved(''))
                    dispatch(contentTitleSaved(''))
                    dispatch(contentSaved(''))
                    dispatch(commentSaved(''))
                    dispatch(etcSaved(''))
                    dispatch(minSaved(0))
                    dispatch(maxSaved(0))
                    // chk()
                }
            });
        }
        else {
            return ;
        }
    }

    useEffect( () => {
        dispatch(pageMoved("NewStory"));   
    }, [])

    

    return (
        <InfoStyle>
            <div className = "title">
                <div>Title </div>
                <input placeholder="Please enter a title" value = {contentTitle} onChange = {handleTitle}/>
            </div>
            <div className = "Category Of Story">
                <div>Category Of Story</div>
                <div>
                    <Parts.Info onClick={setCategory} clicked={isCategoryButton("Essay")}>Essay</Parts.Info>
                    <Parts.Info onClick={setCategory} clicked={isCategoryButton("Novel")}>Novel</Parts.Info>
                    <Parts.Info onClick={setCategory} clicked={isCategoryButton("Poetry")}>Poetry</Parts.Info>
                    <Parts.Info onClick={setCategory} clicked={isCategoryButton("Scenario")}>Scenario</Parts.Info>
                    <Parts.Info onClick={setCategory} clicked={isCategoryButton("Free")}>Free</Parts.Info>
                </div>
            </div>
            <div className = "Writer`s Comment">
                <div>Writer`s Comment</div>
                <div>
                <input placeholder="Please enter a comment" value = {comment} onChange = {handleComment}/>
                </div>
            </div>
            <div className = "Commit Rules">
                <div>Commit Rules</div>
                <div className = "Commit By">
                    Commit By :
                    <Parts.Info onClick={setCommit} clicked={isCommitButton("Chapter")}>Chapter</Parts.Info>
                    <Parts.Info onClick={setCommit} clicked={isCommitButton("Incident")}>Incident</Parts.Info>
                    <Parts.Info onClick={setCommit} clicked={isCommitButton("Scene")}>Scene</Parts.Info>
                    <Parts.Info onClick={setCommit} clicked={isCommitButton("Free")}>Free</Parts.Info>
                </div>
                <div>
                    Length : 
                    <div>Min : 
                    <input value = {min} onChange = {handleMin}/>
                    bytes
                    </div>
                    <div>Max : 
                    <input value = {max} onChange = {handleMax}/>
                    bytes
                    </div>
                </div>
                <div>
                    ETC : 
                    <input placeholder="Please enter a etc" value = {etc} onChange = {handleEtc}/>
                </div>
            </div>
                <button className = {submitClassName} onClick={handleSubmit}>Submit</button>
        </InfoStyle>
    ) // Submit <Link to="/board"> 제출이 안되는 조건이면 보드로 가선 안됨 아니면 보드로 일단은 가지만 제출이 안됐다는 메세지를 띄운다??
}

export default NewStoryInfoPage;
