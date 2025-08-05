import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Log({ goto }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user"); // "user" or "hospital"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "email" ? e.target.value.toLowerCase().trim() : e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const loginUrl =
        userType === "hospital"
          ? "http://localhost:5000/api/routeshospital/login"
          : "http://localhost:5000/api/auth/login";

      console.log("Sending login request:", { url: loginUrl, data: formData });

      const res = await axiosInstance.post(loginUrl.replace("http://localhost:5000/api", ""), formData);

      setSuccess("Login successful!");
      console.log("Login response:", res.data);
      console.log("🔍 Debug - Login response keys:", Object.keys(res.data));
      console.log("🔍 Debug - Token in response:", res.data.token ? "Yes" : "No");

      // Store the token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userType);
        console.log("🔍 Debug - Token stored:", res.data.token.substring(0, 20) + "...");
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        if (res.data.hospital) {
          localStorage.setItem("hospital", JSON.stringify(res.data.hospital));
        }
        
        // Verify token is stored before navigation
        const storedToken = localStorage.getItem("token");
        console.log("🔍 Debug - Token verification:", storedToken ? "Stored successfully" : "Failed to store");

      setTimeout(() => {
          console.log("🔍 Debug - Navigating after login, userType:", userType);
        if (userType === "hospital") {
            console.log("🔍 Debug - Navigating to /BloodB");
          navigate("/BloodB");
        } else {
            console.log("🔍 Debug - Navigating to /home");
          navigate("/home");
        }
        }, 1500); // Increased delay to ensure token is stored
      } else {
        console.log("🔍 Debug - No token in response!");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data, err);
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

        <div>
          <label className="block mb-1 font-medium">Login as:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>

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