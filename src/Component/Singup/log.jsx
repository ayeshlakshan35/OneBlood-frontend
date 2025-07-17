import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // <-- Add this

export default function Log({ goto }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // <-- Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });

      setSuccess("Login successful!");
      console.log(res.data);

      // Redirect to home page after a short delay (optional)
      setTimeout(() => {
        navigate("/home"); // Make sure you have a /home route in your app
      }, 1000); // 1 second delay for user to see message

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <h3 className="text-center text-gray-500">
          Use your email and password to sign in
        </h3>

        <input
          className="w-full p-3 border rounded"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          required
        />

        <input
          className="w-full p-3 border rounded"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Your Password"
          required
        />

        <br />

        <button
          type="submit"
          className="w-full py-2 rounded bg-red-800 text-white transition"
        >
          LOGIN
        </button>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && <p className="text-green-600 text-center text-sm">{success}</p>}

        <p className="text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={goto}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
