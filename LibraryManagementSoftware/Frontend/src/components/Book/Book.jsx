import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';

const Book = ({ books, error, loading, hideAuthorName }) => {
  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      <div style={{ backgroundColor: '#e3f2fd' }}>
        <div className='row'>
          {books.map((book) => {
            const authorName =
              book.author.firstName + ' ' + book.author.lastName;

            return (
              <div className='col-4' key={book._id.toString()}>
                <div className='card m-3'>
                  <img
                    className='card-img-top'
                    src={book.cover}
                    alt='Not found'
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{book.title}</h5>
                    <Link
                      to={`/authors/${book.author._id}`}
                      aria-current='page'
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {!hideAuthorName && (
                        <p className='card-text'>{authorName}</p>
                      )}
                    </Link>
                    <p className='card-text'>
                      <small className='text-muted'>
                        {book.genre.toString().replaceAll(',', ' , ')}
                      </small>
                    </p>
                    {/* <p className='card-text'>
                      <small className='text-muted'>{book.pages} pages</small>
                    </p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Book;
