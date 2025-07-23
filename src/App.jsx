// axios.js or top of App.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true; // Enable credentials for all requests

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
