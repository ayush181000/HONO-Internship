import React, { useEffect } from 'react';
import { fetchBooks } from '../../redux/books/action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader/Loader';

const Book = () => {
  const dispatch = useDispatch();

  const { books, error, loading: loader } = useSelector((state) => state.books);

  useEffect(() => {
    fetchBooks(dispatch);
  }, [dispatch]);

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loader && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}
      <div className='container'>
        <div className='row'>
          <div className='col-1 p-2'>Book Id</div>
          <div className='col-4 p-2'>Name</div>
          <div className='col-4 p-2'>Author</div>
          <div className='col-2 p-2'>Genre</div>
          <div className='col-1 p-2'>Pages</div>
        </div>
      </div>
      {books.map((element) => {
        const id = element._id.toString();
        const authorName =
          element.author.firstName + ' ' + element.author.lastName;

        return (
          <div className='container' key={element._id}>
            <div className='row'>
              <div className='col-1 p-2'>{id.slice(21)}</div>
              <div className='col-4 p-2'>{element.title}</div>
              <div className='col-4 p-2'>{authorName}</div>
              <div className='col-2 p-2'>{element.genre}</div>
              <div className='col-1 p-2'>{element.pages}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Book;
