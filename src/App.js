import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { MdGroup } from 'react-icons/md'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Welcome from './pages/Welcome'
import AnimeRec from './pages/AnimeRec'
import AnimeTop from './pages/AnimeTop'
import DetailRec from './pages/DetailRec'


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/AnimeRec" element={<AnimeRec />} />
        <Route path="/AnimeTop" element={<AnimeTop/>} />
        <Route path="/DetailRec/:id_anime" element={<DetailRec/>} />
      </Routes>
      <footer>
        <NavLink to="/Home" className="iconWrapper">
          <HiHome className="icon" />
          Home
        </NavLink>
        <NavLink to="/About" className="iconWrapper">
          <MdGroup className="icon" />
          About
        </NavLink>
      </footer>
    </BrowserRouter>
  )
}

export default App
