import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import IssueBookModal from './IssueBookModal';

const Book = ({ books, error, loading, hideAuthorName = false }) => {
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = user && token;

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
              <div
                className='col-2 p-0 m-5'
                style={book.quantity <= 0 ? { opacity: 0.4 } : {}}
                key={book._id.toString()}
              >
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
                        <br />
                        {book.pages} pages
                      </small>
                    </p>

                    {/* <div className='card-footer'> */}
                    {isAuthenticated && book.quantity <= 0 && (
                      // unavailble class
                      <span className='w-100 btn btn-md btn-danger'>
                        Unavailable
                      </span>
                    )}

                    {isAuthenticated && book.quantity > 0 && (
                      // issue button
                      <div className='d-flex justify-content-center'>
                        <IssueBookModal book={book} authorName={authorName} />
                      </div>
                    )}
                    {/* </div> */}
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
