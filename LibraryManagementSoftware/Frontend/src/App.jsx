import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Book from './components/Book/Book';
import AuthorList from './components/Author/AuthorList';
import Homepage from './components/Homepage/Homepage';
import MyProfile from './components/MyProfile/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOADED } from './redux/auth/reducer';
import Author from './components/Author/Author/Author';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      // auto login
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      dispatch({ type: AUTH_LOADED, payload: { user, token } });
    }
  }, [dispatch]);

  const userState = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='books' element={<Book />} />
        <Route path='authors' element={<AuthorList />} />
        <Route path='authors/:id' element={<Author />} />
        <Route
          path='/myProfile'
          element={!userState ? <Navigate to='/' /> : <MyProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
