import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AUTH_LOGOUT } from '../../redux/auth/reducer';

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
          </ul>

          {/* My Profile tab */}
          {user ? (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
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
          ) : (
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
