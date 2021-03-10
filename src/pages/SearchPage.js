import React, { useState, useEffect } from 'react';
import UpNav from '../components/navigators/UpNav';
import RightNav from '../components/navigators/RightNav';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pageMoved } from '../actions';
import Parts from '../style/Parts';

const SearchPage = (props) => {
  const state = useSelector((state) => state.textReducer);
  const dispatch = useDispatch();

  const { searchList } = state;

  useEffect(() => {
    dispatch(pageMoved('Search'));
  }, []);

  return (
    <>
      {searchList.map((el) => {
        return (
          <div key={el.board_index}>
            <div>{el.title}</div>
            <div>{el.content}</div>
            <div>{el.up_count}</div>
            <div>{el.created_at}</div>
          </div>
        );
      })}
    </>
  );
};

export default SearchPage;
