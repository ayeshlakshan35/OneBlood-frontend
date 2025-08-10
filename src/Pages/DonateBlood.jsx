import Navbar from "../Component/Navbar/Navbar";
import React, { useState } from "react";
import Footer from "../Component/Footer/Footer";
import er from "../assets/ab.png";

const DonorEligibility = () => {
  const isFormValid = () => {
    return (
      formData.bloodType &&
      formData.ageCriteria &&
      formData.donationGap &&
      formData.hemoglobin &&
      formData.healthCondition &&
      formData.identityProof
    );
  };

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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section - Added pt-20 to account for navbar */}
      <section className="relative text-center mb-12 min-h-[600px] rounded-b-[40px] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={er} className="w-full h-full object-cover object-center" alt="Donate Blood" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-red-600/50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Become a Donor. Save Lives.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            Your one donation can save up to three lives.
          </p>
        </div>
      </section>

      {/* Eligibility Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-4 text-green-700">✅ Who Can Donate?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Age above 18 and below 60 years</li>
            <li>• At least 4 months since last donation</li>
            <li>• Hemoglobin level above 12g/dL</li>
            <li>• No serious medical conditions or pregnancy</li>
            <li>• Valid identity proof</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-4 text-red-700">⚠️ Risk Behaviors (Disqualified)</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Sex workers or their clients</li>
            <li>• Drug addicts</li>
            <li>• Engaging in sex with multiple partners</li>
          </ul>
        </div>
      </section>

      {/* Types of Donors */}
      <section className="bg-white p-8 max-w-5xl mx-auto rounded-2xl shadow-md mb-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Types of Donors</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Voluntary (Most Encouraged)</strong>
            <p>Safest and most encouraged form of donation. No payment involved.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Replacement</strong>
            <p>Donation for family members or friends in need.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Paid</strong>
            <p>Donation with monetary compensation.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Directed</strong>
            <p>Donation for a specific patient's medical need.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl mb-16 mx-auto px-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Eligibility Form</h2>

        {/* Blood Type */}
        <label className="block mb-4 font-medium text-gray-700">
          Select Blood Type
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg mt-2 p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            required
          >
            <option value="">Choose your blood type</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { name: "ageCriteria", label: "I meet the age criteria (18–60 years)" },
            { name: "donationGap", label: "4 months gap since last donation" },
            { name: "hemoglobin", label: "Hemoglobin level above 12g/dL" },
            { name: "healthCondition", label: "Free from serious conditions/pregnancy" }
          ].map((item) => (
            <label key={item.name} className="flex items-center bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                name={item.name}
                checked={formData[item.name]}
                onChange={handleChange}
                className="mr-3 w-5 h-5 text-red-600 focus:ring-red-500 rounded"
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* File Upload */}
        <label className="block mb-6 font-medium text-gray-700">
          Identity Proof
          <div className="flex items-center mt-3">
            <label className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 cursor-pointer transition">
              📂 Upload Identity Document
              <input
                type="file"
                name="identityProof"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
            {formData.identityProof && (
              <span className="ml-4 text-sm text-green-600 font-medium">
                {formData.identityProof.name}
              </span>
            )}
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            isFormValid()
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Eligibility
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default DonorEligibility;