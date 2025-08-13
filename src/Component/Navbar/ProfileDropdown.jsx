import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { getSessionData, clearSessionData } from '../../axiosInstance';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get user data from localStorage
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState('');

  // Update user data when sessionStorage changes
  useEffect(() => {
    const updateUserData = () => {
      try {
        const userData = getSessionData('user');
        const userTypeData = getSessionData('userType');
        
        if (userData) {
          if (userData && typeof userData === 'object') {
            setUser(userData);
          } else {
            console.error('Invalid user data format:', userData);
            setUser({});
          }
        } else {
          setUser({});
        }
        
        if (userTypeData) {
          setUserType(userTypeData);
        } else {
          setUserType('');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser({});
        setUserType('');
      }
    };

    // Update immediately
    updateUserData();
    
    // Debug logging
    console.log('ProfileDropdown useEffect - Initial check:', {
      user: getSessionData('user'),
      userType: getSessionData('userType')
    });

    // Check when component gains focus
    const handleFocus = () => {
      updateUserData();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear all stored data for this session
    clearSessionData();
    
    // Close dropdown
    setIsOpen(false);
    
    // Redirect to login page
    navigate('/Login');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Generate initials from first and last name
  const getInitials = () => {
    try {
      if (user && user.firstName && user.lastName) {
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
      }
      return user && user.email ? user.email.charAt(0).toUpperCase() : 'U';
    } catch (error) {
      console.error('Error generating initials:', error);
      return 'U';
    }
  };

  // Get display name
  const getDisplayName = () => {
    try {
      if (user && user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      }
      return user && user.email ? user.email : 'User';
    } catch (error) {
      console.error('Error getting display name:', error);
      return 'User';
    }
  };

  // Don't render if no user data or if user data is invalid
  if (!user || Object.keys(user).length === 0 || !user.email) {
    console.log('ProfileDropdown: Invalid user data, showing fallback:', user);
    return (
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-red-300 bg-white hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          U
        </div>
        <span className="text-gray-700 font-medium text-sm">User</span>
        <IoMdArrowDropdown className="text-lg text-gray-600" />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
             {/* Profile Button */}
       <button
         onClick={toggleDropdown}
         className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-red-300 bg-white hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
       >
        {/* Profile Avatar */}
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getInitials()}
        </div>
        
        {/* User Name */}
        <span className="text-gray-700 font-medium text-sm">
          {getDisplayName()}
        </span>
        
        {/* Dropdown Arrow */}
        <IoMdArrowDropdown 
          className={`text-lg text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

             {/* Dropdown Menu */}
       {isOpen && (
         <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-red-200 z-50">
                     {/* User Info Section */}
           <div className="px-4 py-3 border-b border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials()}
              </div>
                             <div>
                 <p className="text-gray-800 font-semibold text-sm">
                   {getDisplayName()}
                 </p>
                 <p className="text-gray-600 text-xs">
                   {user && user.email ? user.email : 'No email'}
                 </p>
               </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="py-2">
                         <button 
               onClick={() => {
                 setIsOpen(false);
                 navigate('/Settings');
               }}
               className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
             >
               <FiSettings className="text-lg" />
               <span className="text-sm">Settings</span>
             </button>
            
                         <button 
               onClick={handleLogout}
               className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
             >
               <FiLogOut className="text-lg" />
               <span className="text-sm">Sign Out</span>
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
