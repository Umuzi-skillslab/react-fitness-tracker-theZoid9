import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/pages/Home';


import './App.css'

function App() {
  

  return (
    <BrowserRouter>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </div>


  
    </BrowserRouter>
  )
}

export default App
