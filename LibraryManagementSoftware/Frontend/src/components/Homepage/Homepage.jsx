import React, { useEffect } from 'react';
import Login from './Login';
// import Alert from '../shared/Alert/Alert';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate('/books');
    }
  });

  return (
    <>
      {/* <Alert message={'Hi'} role={'danger'} /> */}
      <div className='.bg-secondary.bg-gradient'>
        <figure className='text-center'>
          <blockquote className='blockquote'>
            <p>
              This website is built under HONO as a part of my internship
              training
            </p>
          </blockquote>
          <figcaption className='blockquote-footer'>
            Made By <cite title='Source Title'>Ayush Garg</cite>
          </figcaption>
        </figure>
      </div>

      <div className='float-container'>
        <div className='float-child'>
          <Login />
        </div>

        <div className='float-child'>
          <img src='library.jpeg' className='img-fluid' alt='Library' />
        </div>
      </div>
    </>
  );
};

export default Homepage;
