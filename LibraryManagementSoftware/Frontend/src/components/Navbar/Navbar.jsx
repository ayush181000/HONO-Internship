import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const [state, setState] = useState('home');

  const changeState = (page) => {
    setState(page);
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link
          to='/'
          className='btn navbar-brand'
          onClick={() => changeState('home')}
        >
          Library Management
        </Link>
        <button
          className='nav navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {/* Books tab */}
            <li className='nav nav-item '>
              <Link
                to='/books'
                onClick={() => changeState('books')}
                className={state === 'books' ? 'nav-link active' : 'nav-link'}
                aria-current='page'
              >
                Books
              </Link>
            </li>

            {/* Author tab */}
            <li className='nav nav-item '>
              <Link
                to='/authors'
                onClick={() => changeState('authors')}
                className={state === 'authors' ? 'nav-link active' : 'nav-link'}
                aria-current='page'
              >
                Authors
              </Link>
            </li>

            {/* My Profile tab */}
            {user && (
              <li className='nav nav-item'>
                <Link
                  to='/myProfile'
                  onClick={() => changeState('myProfile')}
                  className={
                    state === 'myProfile' ? 'nav-link active' : 'nav-link'
                  }
                  aria-current='page'
                >
                  My Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
