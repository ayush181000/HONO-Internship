import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Book from './components/Book/Book';
import Author from './components/Author/Author';
import Homepage from './components/Homepage/Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/books' element={<Book />} />
        <Route path='/authors' element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
