import axios from "axios";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Enable credentials for all requests
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth headers if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔍 Debug - Adding token to request:", config.url);
    } else {
      console.log("🔍 Debug - No token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios error:", error);
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear stored authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("hospital");
      localStorage.removeItem("userType");
      
      // Redirect to login page
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 