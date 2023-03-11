import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_MY_ISSUED_BOOK_ERROR,
  GET_MY_ISSUED_BOOK_INITIATED,
  GET_MY_ISSUED_BOOK_SUCCESS,
  UNSET_MY_ISSUED_BOOK,
} from '../../redux/books/reducer';
import Book from '../Book/Book';

const MyIssuedBook = () => {
  const [page, setPage] = useState('issued'); //can be issued or returned

  const { myBooks, error, loading } = useSelector((state) => {
    return state.books;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getMyBooks();
    return () => {
      dispatch({ type: UNSET_MY_ISSUED_BOOK });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  async function getMyBooks() {
    dispatch({ type: GET_MY_ISSUED_BOOK_INITIATED });
    try {
      const response = await axios.get(`/book/myBooks?option=${page}`);

      // console.log(response);
      dispatch({
        type: GET_MY_ISSUED_BOOK_SUCCESS,
        payload: response.data.myBooks,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_ISSUED_BOOK_ERROR,
        payload: error.response.data.message,
      });
    }
  }

  return (
    <>
      <ul className='nav nav-tabs justify-content-center'>
        <li className='nav-item'>
          <button
            className={page === 'issued' ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              setPage('issued');
            }}
          >
            Currently Issued
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={page === 'returned' ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              setPage('returned');
            }}
          >
            Returned
          </button>
        </li>
      </ul>

      {myBooks?.length === 0 ? (
        <h1 className='text-center p-4'>
          No Books {page === 'issued' ? 'Issued' : 'Returned'}
        </h1>
      ) : (
        <Book
          books={myBooks}
          error={error}
          loading={loading}
          returnButton={page === 'issued'}
          viewReturnedDetails={page === 'returned'}
        />
      )}
    </>
  );
};

export default MyIssuedBook;
