import React, { useState } from "react";
import Footer from "../Component/Footer/Footer";

export default function FindBlood() {
  const [formData, setFormData] = useState({
    bloodType: '',
    address: '',
    province: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Blood available at District General Hospital - Matara');
  };

  return (
    <div>
      <center className="text-2xl font-bold my-4">Find Your Blood</center>

      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Blood Type *</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Full Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter complete address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Province *</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Province</option>
                <option value="Western">Western</option>
                <option value="Southern">Southern</option>
                <option value="Central">Central</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-4">
            Find Now
          </button>
        </form>

        {/* Result Display (Static for now) */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Claim Your Blood</h3>
          <p>District General Hospital - Matara</p>
          <p>Call: <a href="tel:0775050505" className="text-blue-600">077-5050505</a></p>
          <p className="text-green-600 font-semibold">Available Your Blood</p>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Order Blood</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

