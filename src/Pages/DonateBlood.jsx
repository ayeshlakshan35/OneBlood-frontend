import Navbar from '../Component/Navbar/Navbar';
import React, { useState } from "react";
import Footer from '../Component/Footer/Footer';
import er from "../assets/er.png";

const DonorEligibility = () => {
  const [formData, setFormData] = useState({
    bloodType: "",
    ageCriteria: false,
    donationGap: false,
    hemoglobin: false,
    healthCondition: false,
    identityProof: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="">
      
      <section className="relative text-center mb-12 min-h-[400px] bg-red-400 py-12 rounded overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30">
        <img src={er} className='w-full'/>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Become a Donor. Save Lives.</h1>
            <p className="text-white">Your one donation can save up to three lives.</p>
        </div>
      </section>

      

       <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-green-50 p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-3">Who Can Donate?</h2>
          <ul className="list-disc pl-5 text-green-700">
            <li>Age above 18 and below 60 years</li>
            <li>At least 4 months since last donation</li>
            <li>Hemoglobin level above 12g/dL</li>
            <li>No serious medical conditions or pregnancy</li>
            <li>Valid identity proof</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-3 text-red-700">Risk Behaviors (Disqualified)</h2>
          <ul className="list-disc pl-5 text-red-600">
            <li>Sex workers or their clients</li>
            <li>Drug addicts</li>
            <li>Engaging in sex with multiple partners</li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 p-6 max-w-4xl mx-auto rounded shadow">
        <h2 className="text-xl font-semibold mb-3 text-center">Types of Donors</h2>
        <div className="list-disc pl-5 text-gray-700">
          <strong>Voluntary (Most Encouraged)</strong> 
          <p>Safest and most encouraged form of donation. No payment involved.</p>
          <strong>Replacement</strong> 
          <p>Donation for family members or friends in need.</p>
          <strong>Paid</strong> 
          <p>Donation with monetary compensation.</p>
          <strong>Directed</strong> 
          <p>Donation for a specific patient’s medical need.</p>
        </div>
      </section>

      <section className="p-6 max-w-4x5 max-h-6 mx-auto"></section>
      

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-4xl mb-12 mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Eligibility Form</h2>

        <label className="block mb-3">
          Select Blood Type
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="block w-full border rounded mt-1 p-2"
            required
          >
            <option value="">Choose your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="ageCriteria" checked={formData.ageCriteria} onChange={handleChange} className="mr-2" />
            I meet the age criteria (18–60 years)
          </label>

          <label className="flex items-center">
            <input type="checkbox" name="donationGap" checked={formData.donationGap} onChange={handleChange} className="mr-2" />
            4 months gap since last donation
          </label>

          <label className="flex items-center">
            <input type="checkbox" name="hemoglobin" checked={formData.hemoglobin} onChange={handleChange} className="mr-2" />
            Hemoglobin level above 12g/dL
          </label>

          <label className="flex items-center">
            <input type="checkbox" name="healthCondition" checked={formData.healthCondition} onChange={handleChange} className="mr-2" />
            Free from serious conditions/pregnancy
          </label>
        </div>

        <label className="block mb-4">
          Identity Proof
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center cursor-pointer">
              <span className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                📂 Upload Identity Document
              </span>
              <input type="file" name="identityProof" onChange={handleChange} className="hidden" required />
            </label>
            {formData.identityProof && (
              <span className="ml-4 text-sm text-green-700">
                {formData.identityProof.name}
              </span>
            )}
          </div>
        </label>

        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Confirm Eligibility
        </button>
      </form>

      

      <section className="p-6 max-w-4x5 max-h-6 mx-auto"></section>

      <Footer/>
    </div>
  );
};

export default DonorEligibility;
