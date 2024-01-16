import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Routes, Route, json } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Categorey from './components/Categorey';

function App() {
  const [condition, setCondition] = useState(false)

  return (
    <>
      <Navbar setCondition={setCondition} />
      <Routes>
        <Route>
          <Route path="/" exact element={<Home />} />
          <Route path="/categorey" element={<Categorey />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

