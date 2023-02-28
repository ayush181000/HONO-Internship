import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAuthorById } from '../../../redux/author/action';
import Loader from '../../shared/Loader/Loader';

const Author = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // const [author, setAuthor] = useState({
  //   image: '',
  //   firstName: '',
  //   lastName: '',
  // });

  useEffect(() => {
    fetchAuthorById(dispatch, id);
  }, []);

  const { author, error, loading } = useSelector((state) => {
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px',
          alignContent: 'flex-start',
        }}
      >
        <div style={{ width: '200px', height: '200px' }}>
          <img src={author.image} alt='' />
        </div>
        <div style={{ width: '600px', height: '600px' }}>
          <h1>{author.firstName + ' ' + author.lastName}</h1>
        </div>
      </div>
    </>
  );
};

export default Author;
