import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import CampHistory from "./CampHistory";

export default function AddCamp() {
  const [formData, setFormData] = useState({
    title: "",
    hospital: "",
    date: "",
    time: "",
    location: "",
    description: "",
    contact: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Handle file input correctly
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // token saved after login
    if (!token) return alert("Please login first");

    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        submitFormData.append(key, value);
      }
    });

    try {
      await axiosInstance.post("/camp/add", submitFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Campaign created successfully!");
      // Reset form after successful submission
      setFormData({
        title: "",
        hospital: "",
        date: "",
        time: "",
        location: "",
        description: "",
        contact: "",
        document: null,
      });
      // Refresh the page to show updated history
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error creating campaign");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Add Campaign Form */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            Add Blood Donation Campaign
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="title"
                type="text"
                placeholder="Enter campaign title"
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.title}
                required
              />
              <input
                name="hospital"
                type="text"
                placeholder="Enter organizing hospital"
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.hospital}
                required
              />
              <input 
                name="date"
                type="date"
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.date}
                required
              />
              <input 
                name="time"
                type="time"
          
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.time}
                required
              />
              <input
                name="location"
                type="text"
                placeholder="Enter venue location"
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.location}
                required
              />
              <input
                name="contact"
                type="text"
                placeholder="Contact person name and phone"
                className="border px-3 py-2 rounded w-full"
                onChange={handleChange}
                value={formData.contact}
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Enter campaign description and details..."
              className="border px-3 py-2 rounded w-full"
              onChange={handleChange}
              value={formData.description}
              required
            />

            <div className="border rounded p-4 text-center text-gray-500 cursor-pointer text-sm">
              <label className="block mb-1 font-medium">Valid Documents*</label>
              <input
                  name="document"
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required
                  />
            </div> 

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </section>

        {/* Campaign History */}
        <CampHistory />
      </div>
    </div>
  );
}
