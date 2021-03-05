import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from "react-paginate";
import { pageMoved } from '../actions'
import Parts from '../style/Parts'
import StoryCard from '../components/cards/StoryCard'
import fakeData from '../fakeData'

const BoardPage = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(pageMoved("Board"));
    }, [])

    let hot = []
        for(let el of fakeData.boardFakeData.slice()) {
            hot.push(el)
        }
    hot.sort((a, b) => (b.up_count - b.down_count) - (a.up_count - a.down_count))

    const [newStory, setNewStory] = useState(fakeData.boardFakeData.slice())
    const [hotStory, setHotStory] = useState(hot)

    const [newPageNumber, setNewPageNumber] = useState(0)
    const [hotPageNumber, setHotPageNumber] = useState(0)

    const newBoardsPerPage = 3
    const hotBoardsPerPage = 3

    const newPagesVisited = newPageNumber * newBoardsPerPage
    const hotPagesVisited = hotPageNumber * hotBoardsPerPage

    const displayNewStory = newStory
    .slice(newPagesVisited, newPagesVisited + newBoardsPerPage)
    .map((newBoard) => {
        return (
                <StoryCard
                    board_index={newBoard.board_index}
                    content={newBoard.content}
                    up_count={newBoard.up_count}
                    down_count={newBoard.down_count}
                    title={newBoard.title}
                    nickname={newBoard.nickname}
                    created_at={newBoard.created_at}
                />
        )
    })
    const displayHotStory = hotStory
    .slice(hotPagesVisited, hotPagesVisited + hotBoardsPerPage)
    .map((hotBoard) => {
        return (
                <StoryCard
                    board_index={hotBoard.board_index}
                    content={hotBoard.content}
                    up_count={hotBoard.up_count}
                    down_count={hotBoard.down_count}
                    title={hotBoard.title}
                    nickname={hotBoard.nickname}
                    created_at={hotBoard.created_at}
                />
        )
    })

    const newPageCount = Math.ceil(hotStory.length / newBoardsPerPage)
    const hotPageCount = Math.ceil(hotStory.length / hotBoardsPerPage)

    const newChangePage = ({selected}) => {
        setNewPageNumber(selected)
    }
    const hotChangePage = ({selected}) => {
        setHotPageNumber(selected)
    }

    return (
            <>
                <Parts.Board>
                    <h1>Hot Story</h1>
                    {displayHotStory}
                    <ReactPaginate 
                    pageCount={hotPageCount}
                    // pageRangeDisplayed={5}
                    // marginPagesDisplayed={0}
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    onPageChange={hotChangePage}
                    // containerClassName={"pagination-ul"}
                    // activeClassName={"currentPage"}
                    // previousClassName={"pageLabel-btn"}
                    // nextClassName={"pageLabel-btn"}
                    />
                </Parts.Board>
                <Parts.Board>
                    <h1>New Story</h1>
                    {displayNewStory}
                <ReactPaginate 
                    pageCount={newPageCount}
                    // pageRangeDisplayed={5}
                    // marginPagesDisplayed={0}
                    // breakLabel={""}
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    onPageChange={newChangePage}
                    // containerClassName={"pagination-ul"}
                    // activeClassName={"currentPage"}
                    // previousClassName={"pageLabel-btn"}
                    // nextClassName={"pageLabel-btn"}
                />
                </Parts.Board>
            </>
    )
}

export default BoardPage;