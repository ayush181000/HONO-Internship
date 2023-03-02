import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchBooks } from '../../redux/books/action';
import { UNSET_SEARCH_BOOKS } from '../../redux/books/reducer';
import Book from '../Book/Book';
import SearchBar from '../Search Bar/SearchBar';

const SearchPage = () => {
  const { option, searchText } = useParams();

  const dispatch = useDispatch();

  const {
    searchBooks: searchBook,
    loading,
    error,
  } = useSelector((state) => state.books);

  useEffect(() => {
    searchBooks(dispatch, { option, searchText });
    return () => {
      dispatch({ type: UNSET_SEARCH_BOOKS });
    };
  }, [dispatch, option, searchText]);

  return (
    <>
      <SearchBar defaultSearchText={searchText} defaultOptionState={option} />

      {searchBook && (
        <Book books={searchBook} error={error} loading={loading}></Book>
      )}

      {searchBook && searchBook.length === 0 && (
        <div className='alert alert-info m-4'>No results found</div>
      )}
    </>
  );
};

export default SearchPage;
