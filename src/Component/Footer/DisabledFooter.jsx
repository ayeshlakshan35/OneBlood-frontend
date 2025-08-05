import React, { useState } from 'react';

const DisabledFooter = ({ onFooterClick }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDisabled(true);
    
    // Call parent handler
    if (onFooterClick) {
      onFooterClick(e);
    }
    
    // Re-enable after 2 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <footer 
      className="w-full bg-red-900 text-white transition-all duration-300 opacity-70 pointer-events-none blur-[1px]"
      onClick={handleClick}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
        
       
        <div>
          <h2 className="text-lg font-semibold mb-2">OneBlood</h2>
          <p className="text-gray-200">
            OneBlood is a not-for-profit blood center serving hospitals and patients across the Southeast. Every donation helps save up to three lives.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-200">
            <li><span className="cursor-not-allowed">Donate Blood</span></li>
            <li><span className="cursor-not-allowed">Find a Blood</span></li>
            <li><span className="cursor-not-allowed">Blood Types</span></li>
            <li><span className="cursor-not-allowed">Camps</span></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-gray-200">
            <li><span className="cursor-not-allowed">Contact Us</span></li>
            <li><span className="cursor-not-allowed">FAQs</span></li>
            <li><span className="cursor-not-allowed">Privacy Policy</span></li>
            <li><span className="cursor-not-allowed">Terms of Service</span></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <ul className="space-y-1 text-gray-200">
            <li>Donor Services:<br /><span className="font-medium">1-888-9DONATE</span></li>
            <li>24/7 Emergency:<br /><span className="font-medium">1-800-BLOOD-HELP</span></li>
            <li>General Inquiries:<br /><span className="cursor-not-allowed">info@oneblood.org</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-red-700 text-center text-xs text-gray-300 py-4 px-4">
        © 2024 OneBlood, Inc. All rights reserved. &nbsp; EIN: 59-3018540
      </div>
    </footer>
  );
};

export default DisabledFooter; 