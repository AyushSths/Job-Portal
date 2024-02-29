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
import Apply from './components/pages/Apply';
import PostedJobs from './components/pages/PostedJobs';
import SearchJobs from './components/pages/SearchJobs';

function App() {
  const [condition, setCondition] = useState(false)
  const [categorey, setCategory] = useState(null)
  const [search_term, setSearchTerm] = useState("")

  return (
    <>
      <Navbar setCondition={setCondition} setCategory={setCategory} />
      <div className='route-container'>
        <Routes>
          <Route path="/" exact element={<Home setCategory={setCategory} setSearchTerm={setSearchTerm} search_term={search_term} />} />
          <Route path="/search" exact element={<SearchJobs setCategory={setCategory} setSearchTerm={setSearchTerm} search_term={search_term} />} />
          <Route path="/categorey" element={<Categorey category={categorey} setSearchTerm={setSearchTerm} search_term={search_term} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<View />} />
          <Route path="/apply" element={<Apply />} />
          {/* <Route path="/edit" element={<Edit />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/post" element={<PostJob />} />
          <Route path="/edit/:id" element={<PostJob />} />
          <Route path="/posted" element={<PostedJobs />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

