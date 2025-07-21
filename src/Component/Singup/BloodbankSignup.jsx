import React from 'react';
import axios from 'axios';


export default function BloodbankSignup({ gotoBloodBank, goto }) {
  return (
    <div>
      <div className='space-x-3'>
        <span className='text-center text-gray-500 cursor-pointer' onClick={gotoBloodBank}>
          User
        </span>
        <span className='text-2xl font-bold text-center space-x-10 cursor-pointer'>
          Blood bank
        </span>
        <div>
          <form className='bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>Sign up</h1>

            {/* Hospital Name */}
            <label className='block mb-1 font-medium'>Hospital Name*</label>
            <input
              type="text"
              placeholder="Enter hospital name"
              className="w-full p-2 border rounded"
            />

            {/* Address & District */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Address*</label>
                <input
                  type="text"
                  placeholder='Enter hospital address'
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>District*</label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select district</option>
                  <option value="MATARA">MATARA</option>
                  <option value="COLOMBO">COLOMBO</option>
                  <option value="GALLE">GALLE</option>
                  <option value="KANDY">KANDY</option>
                  <option value="JAFFNA">JAFFNA</option>
                  <option value="TRINCOMALEE">TRINCOMALEE</option>
                  <option value="BATTICALOA">BATTICALOA</option>
                  <option value="ANURADHAPURA">ANURADHAPURA</option>
                  <option value="MANNAR">MANNAR</option>
                  <option value="HAMBANTOTA">HAMBANTOTA</option>
                  <option value="NUWARA ELIYA">NUWARA ELIYA</option>
                  <option value="POLONNARUWA">POLONNARUWA</option>
                  <option value="BAGATTA">BAGATTA</option>
                  <option value="KALUTARA">KALUTARA</option>
                  <option value="KURUNEGALA">KURUNEGALA</option>
                  <option value="MATALE">MATALE</option>
                  <option value="RATNAPURA">RATNAPURA</option>
                  <option value="KEGALLE">KEGALLE</option>
                  <option value="MULLAITIVU">MULLAITIVU</option>
                  <option value="VAVUNIYA">VAVUNIYA</option>
                  <option value="KILINOCHCHI">KILINOCHCHI</option>
                  <option value="MONERAGALA">MONERAGALA</option>
                  <option value="BADULLA">BADULLA</option>
                  <option value="AMPARA">AMPARA</option>
                  <option value="KALMUNAI">KALMUNAI</option>
                  <option value="SRI JAYAWARDENEPURA KOTTE">SRI JAYAWARDENEPURA KOTTE</option>
                </select>
              </div>
            </div>

            {/* Documents and Phone Number */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className='block mb-1 font-medium'>Valid Documents*</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className='block mb-1 font-medium'>Phone Number*</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Email */}
            <label className='block mb-1 font-medium'>Email Address*</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-2 border rounded"
            />

            {/* Passwords */}
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Password*</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Confirm Password*</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-2 rounded bg-red-800 text-white transition"
              type='submit'
            >
              Register
            </button>

            {/* Navigation to Sign In */}
            <p className='text-center text-sm sm:text-base'>
              Already have an account?{' '}
              <span
                className='text-blue-500 cursor-pointer hover:underline'
                onClick={goto}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
