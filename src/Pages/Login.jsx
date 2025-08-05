import React, { useState } from "react";
import BloodbankSignup from "../Component/Singup/BloodbankSignup";
import Singup from "../Component/Singup/UserSingup";
import Log from "../Component/Singup/log";
import axios from 'axios';
import DisabledFooter from '../Component/Footer/DisabledFooter';
import DisabledNavbar from '../Component/Navbar/DisabledNavbar';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [bloodbank, setBloodbank] = useState(false);
  const [isNavbarDisabled, setIsNavbarDisabled] = useState(false);
  const [isFooterDisabled, setIsFooterDisabled] = useState(false);

  const goto = () => {
    setIsSignUp(!isSignUp);
  };

  const gotoBloodBank = () => {
    setBloodbank(!bloodbank);
  };

  const handleNavbarClick = (e) => {
    // Add blur effect to navbar and footer only
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (navbar) navbar.style.filter = 'blur(5px)';
    if (footer) footer.style.filter = 'blur(5px)';
    
    // Re-enable after 2 seconds
    setTimeout(() => {
      if (navbar) navbar.style.filter = 'none';
      if (footer) footer.style.filter = 'none';
    }, 2000);
  };

  const handleFooterClick = (e) => {
    // Add blur effect to navbar and footer only
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (navbar) navbar.style.filter = 'blur(5px)';
    if (footer) footer.style.filter = 'blur(5px)';
    
    // Re-enable after 2 seconds
    setTimeout(() => {
      if (navbar) navbar.style.filter = 'none';
      if (footer) footer.style.filter = 'none';
    }, 2000);
  };

  return (
    <div>
      <DisabledNavbar onNavbarClick={handleNavbarClick} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 overflow-auto">
        {isSignUp ? (
          // login In
          <Log goto={goto} />
        ) : !bloodbank ? (
          // Sign Up for User
          <Singup gotoBloodBank={gotoBloodBank} goto={goto} />
        ) : (
          <BloodbankSignup gotoBloodBank={gotoBloodBank} goto={goto} />
        )}
      </div>
      <br/>
      <DisabledFooter onFooterClick={handleFooterClick} />
    </div>
  );
}
