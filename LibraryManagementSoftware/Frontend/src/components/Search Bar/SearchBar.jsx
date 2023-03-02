import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ defaultSearchText, defaultOptionState }) => {
  const [searchText, setSearchText] = useState(defaultSearchText);
  const [optionState, setOptionState] = useState(defaultOptionState);
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = user && token;

  const submitHandler = () => {
    if (isAuthenticated) {
      if (searchText.length > 0)
        navigate('/search/' + optionState + '/' + searchText);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='m-0 p-1' style={{ backgroundColor: '#e3f2fd' }}>
      <div className='m-2'>
        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <form className='input-group' onSubmit={submitHandler}>
              <div className='input-group-btn search-panel'>
                <select
                  className='btn btn-default dropdown-toggle'
                  data-toggle='dropdown'
                  value={optionState}
                  onChange={(e) => setOptionState(e.target.value)}
                >
                  <option value='all'>All</option>
                  <option value='title'>Title</option>
                  <option value='author'>Author</option>
                  <option value='genre'>Genre</option>
                </select>
              </div>
              <input
                type='text'
                className='form-control form-input m-1'
                placeholder='Search term...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
              />
              <span className='input-group-btn m-1'>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={submitHandler}
                >
                  <i className='bi bi-search'>Search</i>
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
