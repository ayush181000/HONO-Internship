/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAuthorById } from '../../../redux/author/action';
import Loader from '../../shared/Loader/Loader';

const Author = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    fetchAuthorById(dispatch, id);
    return () => {};
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

      {books.length > 0 && (
        <div>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Genre</th>
                <th scope='col'>Pages</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const id = book._id.toString();
                return (
                  <tr key={book._id}>
                    <th scope='row'>{id.slice(19)}</th>
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.pages}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Author;
