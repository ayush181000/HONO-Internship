import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AUTH_LOGOUT } from '../../redux/auth/reducer';
import { LIBRARY_INCHARGE, USER } from '../../roles';

import './index.css';

const Navbar = () => {
  const [state, setState] = useState('home');

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeState = (page) => {
    setState(page);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: AUTH_LOGOUT });
    navigate('/');
  };

  return (
    <nav className='navbar navbar-light navbar-expand bg-second'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {/* Home tab */}
            <li className='nav nav-item'>
              <Link
                to='/'
                className='btn navbar-brand nav-link'
                onClick={() => changeState('home')}
              >
                The Book Store
              </Link>
            </li>

            {/* Author tab */}
            {user?.role === USER && (
              <li className='nav nav-item'>
                <Link
                  to='/authors'
                  onClick={() => changeState('authors')}
                  className={
                    state === 'authors'
                      ? 'btn navbar-brand nav-link active'
                      : 'btn navbar-brand nav-link'
                  }
                  aria-current='page'
                  style={{ float: 'right' }}
                >
                  Authors
                </Link>
              </li>
            )}

            {user?.role === LIBRARY_INCHARGE && (
              <li
                className='nav btn navbar-brand'
                style={{ cursor: 'default' }}
              >
                Library Incharge
              </li>
            )}
          </ul>

          {/* My Profile tab */}
          {user?.role === USER && (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav nav-item'>
                <Link
                  to='/myIssuedBook'
                  onClick={() => changeState('myIssuedBook')}
                  className={
                    state === 'myIssuedBook'
                      ? 'btn navbar-brand nav-link active'
                      : 'btn navbar-brand nav-link'
                  }
                  aria-current='page'
                >
                  My Issued Books
                </Link>
              </li>

              <li className='nav nav-item'>
                <Link
                  to='/myProfile'
                  onClick={() => changeState('myProfile')}
                  className={
                    state === 'myProfile'
                      ? 'btn navbar-brand nav-link active'
                      : 'btn navbar-brand nav-link'
                  }
                  aria-current='page'
                >
                  My Profile
                </Link>
              </li>

              <li className='nav nav-item'>
                <Link
                  onClick={() => logout()}
                  className='btn navbar-brand nav-link'
                  aria-current='page'
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}

          {user?.role === LIBRARY_INCHARGE && (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav nav-item'>
                <Link
                  to='/allIssuedBooks'
                  onClick={() => changeState('allIssuedBooks')}
                  className={
                    state === 'allIssuedBooks'
                      ? 'btn navbar-brand nav-link active'
                      : 'btn navbar-brand nav-link'
                  }
                  aria-current='page'
                >
                  All Issued Books
                </Link>
              </li>

              <li className='nav nav-item'>
                <Link
                  onClick={() => logout()}
                  className='btn navbar-brand nav-link'
                  aria-current='page'
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}

          {/* Login Buttons */}
          {!user && (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav nav-item'>
                <Link
                  to='/login'
                  onClick={() => changeState('login')}
                  className={
                    state === 'myProfile'
                      ? 'btn navbar-brand nav-link active'
                      : 'btn navbar-brand nav-link'
                  }
                  aria-current='page'
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
