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
import { ToastContainer } from "react-toastify"; // ✅ Import Toastify container
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles

function App() {
  return (
    <>
      <Router>
        {/* ✅ Keep Navbar visible across pages */}
        <Navbar />

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

      {/* ✅ Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
