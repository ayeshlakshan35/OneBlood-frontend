import React, { useState } from 'react';
import logo from '../../assets/logo2.png';
import { MdMenu, MdClose } from 'react-icons/md';
import { IoMdArrowDropdown } from "react-icons/io";

export default function DisabledNavbar({ onNavbarClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const activeClass = "text-red-800";
  const inactiveClass = "text-gray-700 hover:text-red-700 transition-colors duration-200";
  const [isBloodDropdownOpen, setIsBloodDropdownOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDisabled(true);
    
    // Call parent handler
    if (onNavbarClick) {
      onNavbarClick(e);
    }
    
    // Re-enable after 2 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <nav 
      className="bg-white shadow-md w-full sticky top-0 z-10 transition-all duration-300 opacity-70 pointer-events-none blur-[1px]"
      onClick={handleClick}
    >
      <div className="flex flex-wrap items-center justify-between w-full px-4 py-3">

      {/* Non-clickable Logo */}
        <div className="flex items-center space-x-0.1 cursor-not-allowed">
          <img src={logo} className="h-10 w-10" alt="logo" />
          <span className="text-red-700 font-bold text-lg sm:text-xl">ne</span>
          <span className='font-bold text-lg sm:text-xl'>Blood</span>
        </div>

        {/* Desktop Navigation - All disabled */}
        <div className="hidden md:flex items-center space-x-6 text-sm sm:text-base font-semibold">
          <span className={`${inactiveClass} cursor-not-allowed`}>Home</span>
          <span className={`${inactiveClass} cursor-not-allowed`}>About</span>
          
          <div className="relative -mt">
            <span className={`${inactiveClass} cursor-not-allowed flex items-center space-x-1`}>
              Blood <IoMdArrowDropdown className="text-lg"/>
            </span>
          </div>

          <span className={`${inactiveClass} cursor-not-allowed`}>Camp</span>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-red-200 transition-colors duration-200 cursor-not-allowed">
          <MdMenu className="text-2xl" />
        </div>
      </div>

      {/* Mobile Navigation Links - Disabled */}
      {isOpen && (
        <div className="md:hidden bg-red-50 rounded-b-xl px-4 py-2 space-y-2 iteam-center shadow-md">
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">Home</span><br/>
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">About</span><br/>
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">Find Blood</span><br/>
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">Donate Blood</span><br/>
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">Blood Bank</span><br/>
          <span className="font-semibold text-stone-800 uppercase cursor-not-allowed">Camp</span><br/>
        </div>
      )}
    </nav>
  );
} 