// Remove conflicting axios configuration since we're using axiosInstance

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import About from "./Pages/About";
import FindBlood from "./Pages/FindBlood";
import DonateBlood from "./Pages/DonateBlood";
import BloodBank from "./Pages/BloodBank";
import Camp from "./Pages/Camp";
import Navbar from "./Component/Navbar/Navbar";
import "./App.css";
import Login from "./Pages/Login";
import { BiLogIn } from "react-icons/bi";


function App() {
  return (
    <>
      <Router>
  
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/FBlood" element={<FindBlood />} />
          <Route path="/DBlood" element={<DonateBlood />} />
          <Route path="/BloodB" element={<BloodBank />} />
          <Route path="/Camp" element={<Camp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
    
      </Router> 
    </>
  );
}

export default App;
