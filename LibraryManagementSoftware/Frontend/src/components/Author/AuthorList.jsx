import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../shared/Loader/Loader';

import { fetchAuthors } from '../../redux/author/action';

const AuthorList = () => {
  const dispatch = useDispatch();

  const { authors, error, loading } = useSelector((state) => state.authors);

  useEffect(() => {
    fetchAuthors(dispatch);
  }, [dispatch]);

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      {authors.length > 0 ? (
        <div className='row p-2 m-2' style={{ backgroundColor: '#e3f2fd' }}>
          {authors.map((element) => {
            return (
              <div
                key={element._id}
                className='card p-3 m-4'
                style={{ width: '18rem' }}
              >
                <Link
                  to={`${element._id}`}
                  aria-current='page'
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className='card-img-top'
                    src={element.image}
                    alt='Not found'
                    style={{ width: '100%', height: '210px' }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {element.firstName + ' ' + element.lastName}
                    </h5>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='alert alert-info m-4'>No authors found</div>
      )}
    </>
  );
};

export default AuthorList;
