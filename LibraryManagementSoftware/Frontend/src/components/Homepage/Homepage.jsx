import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Book from '../Book/Book';
import SearchBar from '../Search Bar/SearchBar';

import { fetchBooks } from '../../redux/books/action';

const Homepage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = user && token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    fetchBooks(dispatch);
    if (isAuthenticated) {
      // all
    } else {
      // only public
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <SearchBar defaultOptionState={'all'} defaultSearchText='' />
      <Book books={books} error={error} loading={loading} />

      {!isAuthenticated && (
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-outline-info btn-lg m-3 p-2'
            onClick={() => {
              navigate('/login');
            }}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Homepage;
