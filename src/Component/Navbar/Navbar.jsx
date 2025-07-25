import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { MdMenu, MdClose } from 'react-icons/md';
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const activeClass = "text-red-800";
  const inactiveClass = "text-gray-700 hover:text-red-700 transition-colors duration-200";
  const [isBloodDropdownOpen, setIsBloodDropdownOpen] = useState(false);


  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-10 ">
      <div className="flex flex-wrap items-center justify-between w-full px-4 py-3">

      {/* Clickable Logo */}
        <NavLink to="/Home" className="flex items-center space-x-0.1">
          <img src={logo} className="h-10 w-10" alt="logo" />
          <span className="text-red-700 font-bold text-lg sm:text-xl">ne</span>
          <span className='font-bold text-lg sm:text-xl'>Blood</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base font-semibold">
          <NavLink to="/Home" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => isActive ? activeClass : inactiveClass}>About</NavLink>
          
          <div className="relative -mt ">
            <button
              onClick={() => setIsBloodDropdownOpen(!isBloodDropdownOpen)}
              className={`${inactiveClass} cursor-pointer flex items-center space-x-1`} 
            >
            Blood <IoMdArrowDropdown className={`text-lg transform transition-transform duration-300 ${isBloodDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {isBloodDropdownOpen && (
              <div className="absolute flex flex-col bg-white shadow-md border rounded-md mt-2 min-w-[120px] z-50">
                <NavLink to="/FBlood" className="px-4 py-2 hover:bg-red-100" onClick={() => setIsBloodDropdownOpen(false)}>
                  Find Blood
                </NavLink>
                <NavLink to="/DBlood" className="px-4 py-2 hover:bg-red-100" onClick={() => setIsBloodDropdownOpen(false)}>
                  Donate Blood
                </NavLink>
                <NavLink to="/BloodB" className="px-4 py-2 hover:bg-red-100" onClick={() => setIsBloodDropdownOpen(false)}>
                  Blood Bank
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/Camp" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Camp</NavLink>
          <NavLink to="/Login" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Login</NavLink>
        
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-red-200 transition-colors duration-200" onClick={toggleMenu}>
          {isOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </div>
      </div>





 
      {/* Mobile Navigation Links */}
    {isOpen && (
    <div className="md:hidden bg-red-50 rounded-b-xl px-4 py-2 space-y-2 iteam-center shadow-md">
        <NavLink
          to="/Home"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : "font-semibold text-stone-800  hover:underline uppercase"}
        >
          Home
        </NavLink><br/>

        <NavLink
          to="/About"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : "font-semibold  text-stone-800 hover:underline uppercase"}
        >
          About
        </NavLink><br/>

        <NavLink
          to="/FBlood"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : "font-semibold text-stone-800 hover:underline uppercase"}
        >
          Find Blood
        </NavLink><br/>

         <NavLink
          to="/DBlood"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : "font-semibold text-stone-800 hover:underline uppercase"}
        >
          Donate Blood
        </NavLink><br/>

         <NavLink
          to="/BloodB"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : "font-semibold text-stone-800 hover:underline uppercase"}
        >
          Blood Bank
        </NavLink><br/>

        <NavLink
          to="/Camp"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : " font-semibold text-stone-800 hover:underline uppercase"}
        >
          Camp
        </NavLink><br/>

        <NavLink
          to="/Login"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => isActive ? "text-red-800 font-bold uppercase" : " font-semibold text-stone-800 hover:underline uppercase"}
        >
          Login
        </NavLink>
    </div>
)}


    </nav>
  );
}
