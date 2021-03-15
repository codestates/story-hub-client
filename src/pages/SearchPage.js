import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { pageMoved } from '../actions';
import styled from 'styled-components'
import Parts from '../style/Parts'
import StoryCard from '../components/cards/StoryCard'

const Frame = styled.div`
h1 {
  margin-top: 10px;
}
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`
const CardsFrame = styled.div`
width: 90%;
height: 75vh;
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
flex-wrap: wrap;
`
const PagenateFrame = styled.div`
font-size: 0.8rem;
margin-top: 15px;
ul {
width: 90%;
display: flex;
flex-direction: row;
justify-content: center;
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

const SearchPage = (props) => {
  const state = useSelector((state) => state.textReducer);
  const dispatch = useDispatch();

  const { searchList } = state;
  

  useEffect(() => {
    dispatch(pageMoved('Search'));
  }, []);

  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const searchBoardsPerPage = 8;
  const searchPagesVisited = searchPageNumber * searchBoardsPerPage;
  const searchPageCount = Math.ceil(searchList.length / searchBoardsPerPage);
  const searchChangePage = ({ selected }) => {
    setSearchPageNumber(selected);
  };
  console.log(searchList)
  return (
    <Frame>
      <h1>SEARCH RESULT</h1>
      <CardsFrame>
        {searchList
          .slice(searchPagesVisited, searchPagesVisited + searchBoardsPerPage)
          .map((searchBoard, idx) => {
            let contentState = ContentState.createFromBlockArray(htmlToDraft(searchBoard.content).contentBlocks)
            let onlyText = contentState.getPlainText()              
            return (
              <StoryCard className='hehe'
                key={idx}
                board_index={searchBoard.board_index}
                content={onlyText}
                storyDetail={searchBoard.content}
                up_count={searchBoard.up_count}
                down_count={searchBoard.down_count}
                title={searchBoard.title}
                nickname={searchBoard.nickname}
                created_at={searchBoard.created_at}
                page={'search'}
              />
            );
          })}
        </CardsFrame>
        <PagenateFrame>
          <ReactPaginate
            pageCount={searchPageCount}
            // pageRangeDisplayed={5}
            // marginPagesDisplayed={0}
            previousLabel={'<'}
            nextLabel={'>'}
            onPageChange={searchChangePage}
            // containerClassName={"pagination-ul"}
            // activeClassName={"currentPage"}
            // previousClassName={"pageLabel-btn"}
            // nextClassName={"pageLabel-btn"}
          />
        </PagenateFrame>
    </Frame>
  );
};

export default SearchPage;
