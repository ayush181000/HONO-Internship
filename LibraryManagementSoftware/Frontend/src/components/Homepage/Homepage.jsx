import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Book from '../Book/Book';
import SearchBar from '../Search Bar/SearchBar';
// import Footer from '../Footer/Footer';

import { fetchBooks } from '../../redux/books/action';
import { LIBRARY_INCHARGE, USER } from '../../roles';

const Homepage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = user && token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { books, error, loading } = useSelector((state) => state.books);
  const limit = isAuthenticated ? -1 : 6;
  // console.log(isAuthenticated && user.role === 'user');
  useEffect(() => {
    fetchBooks(dispatch, limit);
  }, [dispatch, isAuthenticated, limit]);

  return (
    <>
      <SearchBar defaultOptionState={'all'} defaultSearchText='' />
      <Book
        books={books}
        error={error}
        loading={loading}
        showButton={isAuthenticated && user.role === USER}
        showQuantity={isAuthenticated && user.role === LIBRARY_INCHARGE}
      />

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
