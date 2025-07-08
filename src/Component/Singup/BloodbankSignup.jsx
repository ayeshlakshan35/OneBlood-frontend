import React from 'react'

export default function BloodbankSignup({gotoBloodBank,goto}) {
  return (
    <div>
       <div className='space-x-3'>
              <span className='text-center text-gray-500 cursor-pointer' onClick={gotoBloodBank}>User</span>
              <span className='text-2xl font-bold text-center space-x-10 cursor-pointer' onClick={gotoBloodBank}>Blood Bank</span>

              <div>
                <form className='bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4'>
                  <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>Sign up</h1>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Hospital Name*</label>
                      <input type="text" name="firstName" placeholder="Enter Hospital name" className="w-full p-2 border rounded" />
                    </div>
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Last Name*</label>
                      <input type="text" name="lastName" placeholder="Enter last name" className="w-full p-2 border rounded" />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Date of Birth*</label>
                      <input type="date" name="dob" className="w-full p-2 border rounded" />
                    </div>
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Phone Number*</label>
                      <input type="tel" name="phone" placeholder="Enter phone number" className="w-full p-2 border rounded" />
                    </div>
                  </div>

                  <label className='block mb-1 font-medium'>Full Address*</label>
                  <input type="text" name="address" placeholder="Enter complete address" className="w-full p-2 border rounded" />

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-1/3">
                      <label className='block mb-1 font-medium'>City *</label>
                      <input type="text" name="city" placeholder="Enter city" className="w-full p-2 border rounded" />
                    </div>
                    <div className="w-1/3">
                      <label className='block mb-1 font-medium'>State *</label>
                      <input type="text" name="state" placeholder="Enter state" className="w-full p-2 border rounded" />
                    </div>
                    <div className="w-1/3">
                      <label className='block mb-1 font-medium'>Postal Code *</label>
                      <input type="text" name="postalCode" placeholder="Postal code" className="w-full p-2 border rounded" />
                    </div>
                  </div>

                  <label className='block mb-1 font-medium'>Email Address*</label>
                  <input type="email" name="email" placeholder="Enter email address" className="w-full p-2 border rounded" />

                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Password *</label>
                      <input type="password" name="password" placeholder="Enter password" className="w-full p-2 border rounded" />
                    </div>
                    <div className='w-full md:w-1/2'>
                      <label className='block mb-1 font-medium'>Confirm Password *</label>
                      <input type="password" name="confirmPassword" placeholder="Confirm password" className="w-full p-2 border rounded" />
                    </div>
                  </div>

                  <button className="w-full py-2 rounded bg-red-800 text-white transition" type='submit'>Register</button>
                  <p className='text-center text-sm sm:text-base'>Already have an account? <span className='text-blue-500 cursor-pointer hover:underline' onClick={goto}>Sign In</span></p>
                </form>
              </div>
            </div>
    </div>
  )
}
