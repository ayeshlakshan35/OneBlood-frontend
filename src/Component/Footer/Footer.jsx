import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-red-900 text-white">
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
            <li><a href="#" className="hover:underline">Donate Blood</a></li>
            <li><a href="#" className="hover:underline">Find a Blood</a></li>
            <li><a href="#" className="hover:underline">Blood Types</a></li>
            <li><a href="#" className="hover:underline">Camps</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-gray-200">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <ul className="space-y-1 text-gray-200">
            <li>Donor Services:<br /><span className="font-medium">1-888-9DONATE</span></li>
            <li>24/7 Emergency:<br /><span className="font-medium">1-800-BLOOD-HELP</span></li>
            <li>General Inquiries:<br /><a href="mailto:info@oneblood.org" className="hover:underline">info@oneblood.org</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-red-700 text-center text-xs text-gray-300 py-4 px-4">
        © 2024 OneBlood, Inc. All rights reserved. &nbsp; EIN: 59-3018540
      </div>
    </footer>
  );
};

export default Footer;
