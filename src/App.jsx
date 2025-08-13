// Remove conflicting axios configuration since we're using axiosInstance
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import About from "./Pages/About";
import FindBlood from "./Pages/FindBlood";
import DonateBlood from "./Pages/DonateBlood";
import BloodBank from "./Pages/BloodBank";
import Camp from "./Pages/Camp";
import Settings from "./Pages/Settings";
import "./App.css";
import Login from "./Pages/Login";
import { ToastProvider } from "./Component/Toast/ToastContext";

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <ToastProvider>
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
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
