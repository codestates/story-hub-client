import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { pageMoved } from '../actions';
import Parts from '../style/Parts';
import StoryCard from '../components/cards/StoryCard';
import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import styled from 'styled-components'

const CardsFrame = styled.div`
width: 80%;
height: 75vh;
display:flex;
flex-direction: column;
justyfy-content: flex-start;
align-items: center;
`

const PagenateFrame = styled.div`
font-size: 0.8rem;
margin-top: 15px;
ul {
width: 80%;
display: flex;
flex-direction: row;
justify-self: end;
}
li {
  display: inline-block;
  margin: 0 3px 0 3px;
}
.previous, .next {
  display: inline-block;
  margin: 0 15px 0 15px;
  font-weight: bold;
}
.selected {
  font-weight: bold;
  text-decoration: underline;
  color: #f49531;
}
`
const BoardPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageMoved('Board'));
    axios({
      url: 'http://localhost:4000/board/list',
      method: 'GET',
      withCredentials: true,
    }).then((res) => {
      const { newStory } = res.data;
      setNewStory(newStory);
      setHotStory(newStory.slice().sort((a, b) => b.up_count - b.down_count - (a.up_count - a.down_count)));
      // console.log(res);
      return res;
    });
  }, []);

  const [newStory, setNewStory] = useState([]);
  const [hotStory, setHotStory] = useState([]);

  const [newPageNumber, setNewPageNumber] = useState(0);
  const [hotPageNumber, setHotPageNumber] = useState(0);

  const newBoardsPerPage = 4;
  const hotBoardsPerPage = 4;

  const newPagesVisited = newPageNumber * newBoardsPerPage;
  const hotPagesVisited = hotPageNumber * hotBoardsPerPage;

  const newPageCount = Math.ceil(hotStory.length / newBoardsPerPage);
  const hotPageCount = Math.ceil(hotStory.length / hotBoardsPerPage);

  const newChangePage = ({ selected }) => {
    setNewPageNumber(selected);
  };
  const hotChangePage = ({ selected }) => {
    setHotPageNumber(selected);
  };

  return (
    <>
      <Parts.Board>
        <h1>Hot Story</h1>
        <CardsFrame>
        {hotStory
          .slice(hotPagesVisited, hotPagesVisited + hotBoardsPerPage)
          .map((hotBoard, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(hotBoard.content).contentBlocks)
            let onlyText = contentState.getPlainText()              
            return (
              <StoryCard
                key={idx}
                board_index={hotBoard.board_index}
                content={onlyText}
                storyDetail={hotBoard.content}
                up_count={hotBoard.up_count}
                down_count={hotBoard.down_count}
                title={hotBoard.title}
                nickname={hotBoard.nickname}
                created_at={hotBoard.created_at}
              />
            );
          })}
        </CardsFrame>
        <PagenateFrame>
        <ReactPaginate
          pageCount={hotPageCount}
          // pageRangeDisplayed={5}
          // marginPagesDisplayed={0}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={hotChangePage}
          // containerClassName={"pagination-ul"}
          // activeClassName={"currentPage"}
          // previousClassName={"pageLabel-btn"}
          // nextClassName={"pageLabel-btn"}
        />
        </PagenateFrame>
      </Parts.Board>
      <Parts.Board>
        <h1>New Story</h1>
        <CardsFrame>
        {newStory
          .slice(newPagesVisited, newPagesVisited + newBoardsPerPage)
          .map((newBoard, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(newBoard.content).contentBlocks)
            let onlyText = contentState.getPlainText() 
            return (
              <StoryCard
                key={idx}
                board_index={newBoard.board_index}
                content={onlyText}
                storyDetail={newBoard.content}
                up_count={newBoard.up_count}
                down_count={newBoard.down_count}
                title={newBoard.title}
                nickname={newBoard.nickname}
                created_at={newBoard.created_at}
              />
            );
          })}
        </CardsFrame>
        <PagenateFrame>
        <ReactPaginate
          pageCount={newPageCount}
          // pageRangeDisplayed={5}
          // marginPagesDisplayed={0}
          // breakLabel={""}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={newChangePage}
          // containerClassName={"pagination-ul"}
          // activeClassName={"currentPage"}
          // previousClassName={"pageLabel-btn"}
          // nextClassName={"pageLabel-btn"}
        />
        </PagenateFrame>
      </Parts.Board>
    </>
  );
};

export default BoardPage;