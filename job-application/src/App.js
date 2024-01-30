import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, json } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Categorey from './components/Categorey';
import View from './components/pages/View';
import SignUp from './components/SignUp';
import PostJob from './components/pages/PostJob';

function App() {
  const [condition, setCondition] = useState(false)
  const [categorey, setCategory] = useState(null)

  return (
    <>
      <Navbar setCondition={setCondition} />
      <div className='route-container'>
        <Routes>
          <Route path="/" exact element={<Home setCategory={setCategory} />} />
          <Route path="/categorey" element={<Categorey category={categorey} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<View />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/post" element={<PostJob />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

