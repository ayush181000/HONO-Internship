import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/author/action';
import Loader from '../shared/Loader/Loader';

const Author = () => {
  const dispatch = useDispatch();

  const authors = useSelector((state) => state.authors.authors);
  const error = useSelector((state) => state.authors.error);
  const loader = useSelector((state) => state.authors.loader);

  useEffect(() => {
    fetchAuthors(dispatch);
  }, [dispatch]);

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loader && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      {authors.map((element) => {
        return (
          <div
            key={element._id}
            className='card p-3 m-4'
            style={{ width: '18rem' }}
          >
            <img
              className='card-img-top'
              src={element.image}
              alt='No image found'
            />
            <div className='card-body'>
              <h5 className='card-title'>
                {element.firstName + ' ' + element.lastName}
              </h5>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Author;
