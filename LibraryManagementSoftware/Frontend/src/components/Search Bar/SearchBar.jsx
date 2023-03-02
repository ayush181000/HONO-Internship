import React, { useState } from 'react';

const SearchBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState('');

  return (
    <div className='container m-2'>
      <div className='row'>
        <div className='col-xs-8 col-xs-offset-2'>
          <form action='#' method='get' id='searchForm' className='input-group'>
            <div className='input-group-btn search-panel'>
              <select
                name='search_param'
                id='search_param'
                className='btn btn-default dropdown-toggle'
                data-toggle='dropdown'
              >
                <option value='all'>All</option>
                <option value='username'>Title</option>
                <option value='email'>Author</option>
                <option value='studentcode'>Genre</option>
              </select>
            </div>
            <input
              type='text'
              className='form-control form-input m-1'
              placeholder='Search term...'
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className='input-group-btn m-1'>
              <button className='btn btn-info' type='submit'>
                Search
                <span className='glyphicon glyphicon-search'></span>
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
