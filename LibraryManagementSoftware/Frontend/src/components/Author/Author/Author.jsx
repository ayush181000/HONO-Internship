/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';
import Book from '../../Book/Book';

import { fetchAuthorById } from '../../../redux/author/action';
import { UNSET_AUTHOR } from '../../../redux/author/reducer';

const Author = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    fetchAuthorById(dispatch, id);
    return () => {
      dispatch({ type: UNSET_AUTHOR });
    };
  }, []);

  const {
    author: { author, books },
    error,
    loading,
  } = useSelector((state) => {
    return state.authors;
  });

  return (
    <>
      {error && (
        <div
          style={{
            display: 'flex',
            padding: '10px',
            justifyContent: 'center',
          }}
        >
          <div className='alert alert-danger p-2' style={{ width: '500px' }}>
            {error}
          </div>
        </div>
      )}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      {author && (
        <div className='container'>
          <div className='row'>
            <div className='col-4 m-2'>
              <img src={author.image} alt='' className='img-fluid' />
            </div>
            <div className='col-7 m-2'>
              <h1>{author.firstName + ' ' + author.lastName}</h1>
            </div>
          </div>
        </div>
      )}

      <Book books={books} hideAuthorName={true} />
    </>
  );
};

export default Author;
