import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import AuthorList from './components/Author/AuthorList';
import Homepage from './components/Homepage/Homepage';
import MyProfile from './components/MyProfile/MyProfile';
import Author from './components/Author/Author/Author';
import Login from './components/Login/Login';
import SearchPage from './components/SearchPage/SearchPage';

import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOADED } from './redux/auth/reducer';

import './index.css';
import MyIssuedBook from './components/My Issued Book/MyIssuedBook';
import axios from 'axios';
import { LIBRARY_INCHARGE } from './roles';
import AllIssuedBooks from './components/AllIssuedBooks/AllIssuedBooks';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      // auto login
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      axios.defaults.headers['Authorization'] = 'Bearer ' + token;

      dispatch({ type: AUTH_LOADED, payload: { user, token } });
    }
  }, [dispatch]);

  const userState = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='login' element={<Login />} />
        <Route path='authors' element={<AuthorList />} />
        <Route path='authors/:id' element={<Author />} />

        <Route
          path='/myProfile'
          element={!userState ? <Navigate to='/' /> : <MyProfile />}
        />

        <Route
          path='/myIssuedBook'
          element={!userState ? <Navigate to='/' /> : <MyIssuedBook />}
        />

        <Route
          path='search/:option/:searchText'
          element={!userState ? <Navigate to='/' /> : <SearchPage />}
        />
        <Route
          path='allIssuedBooks'
          element={
            userState && userState.role === LIBRARY_INCHARGE ? (
              <AllIssuedBooks />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route path='?' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
