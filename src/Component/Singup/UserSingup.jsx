import React, { useState } from 'react';
import axios from 'axios';

export default function Signup({ gotoBloodBank, goto }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true
      });
      setSuccess(res.data.message || 'Registration successful!');
      setError("");
      // Delay redirect so user can see the success message
      setTimeout(() => {
        goto();
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess("");
    }
  };

  return (
    <div>
      <div className='space-x-3'>
        <span className='text-2xl font-bold text-center space-x-10 cursor-pointer'>
          User
        </span>
        <span className='text-center text-gray-500 cursor-pointer' onClick={gotoBloodBank}>
          Blood Bank
        </span>

      </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className='bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4'
          >
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>Sign up</h1>

            <div className="flex flex-col md:flex-row gap-4">
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>First Name*</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" className="w-full p-2 border rounded" />
              </div>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Last Name*</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" className="w-full p-2 border rounded" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Date of Birth*</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Phone Number*</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full p-2 border rounded" />
              </div>
            </div>
            <br />

            <label className='block mb-1 font-medium'>Full Address*</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter complete address" className="w-full p-2 border rounded" />

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-1/3">
                <label className='block mb-1 font-medium'>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="w-full p-2 border rounded" />
              </div>
              <div className="w-1/3">
                <label className='block mb-1 font-medium'>State *</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className="w-full p-2 border rounded" />
              </div>
              <div className="w-1/3">
                <label className='block mb-1 font-medium'>Postal Code *</label>
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal code" className="w-full p-2 border rounded" />
              </div>
            </div>
            <br />

            <label className='block mb-1 font-medium'>Email Address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className="w-full p-2 border rounded" />

            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="w-full p-2 border rounded" />
              </div>
              <div className='w-full md:w-1/2'>
                <label className='block mb-1 font-medium'>Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="w-full p-2 border rounded" />
              </div>
            </div>

            {/* Display error and success messages */}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}

            <button className="w-full py-2 rounded bg-red-800 text-white transition" type='submit'>Register</button>
            <p className='text-center text-sm sm:text-base'>
              Already have an account? <span className='text-blue-500 cursor-pointer hover:underline' onClick={goto}>Sign In</span>
            </p>
          </form>
        </div>
        
      </div>
   
  );
}