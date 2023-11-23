import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdGroup, MdLeaderboard, MdOndemandVideo } from "react-icons/md";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Welcome from "./pages/Welcome";
import AnimeRec from "./pages/AnimeRec";
import AnimeTop from "./pages/AnimeTop";
import AnimeTopSearch from "./pages/AnimeTopSearch";
import DetailRec from "./pages/DetailRec";
import DetailTop from "./pages/DetailTop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/AnimeRec" element={<AnimeRec />} />
        <Route path="/AnimeTop" element={<AnimeTop />} />
        <Route path="/AnimeTopSearch" element={<AnimeTopSearch />} />
        <Route path="/DetailRec/:id_anime" element={<DetailRec />} />
        <Route path="/DetailTop/:mal_id" element={<DetailTop />} />{" "}
        {/* Use ":id" as the parameter name */}
      </Routes>
      <footer>
        <NavLink
          to="/Home"
          className="iconWrapper"
          activeClassName="activeLink"
        >
          <HiHome className="icon" />
          Home
        </NavLink>
        <NavLink
          to="/AnimeTop"
          className="iconWrapper"
          activeClassName="activeLink"
        >
          <MdLeaderboard className="icon" />
          Top Anime
        </NavLink>
        <NavLink
          to="/AnimeRec"
          className="iconWrapper"
          activeClassName="activeLink"
        >
          <MdOndemandVideo className="icon" />
          Nonton Anime
        </NavLink>
        <NavLink
          to="/About"
          className="iconWrapper"
          activeClassName="activeLink"
        >
          <MdGroup className="icon" />
          About
        </NavLink>
      </footer>
    </BrowserRouter>
  );
}

export default App;
