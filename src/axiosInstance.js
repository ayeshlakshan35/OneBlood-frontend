import axios from "axios";

// Generate a unique session ID for this tab
const generateSessionId = () => {
  if (!sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId', `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }
  return sessionStorage.getItem('sessionId');
};

// Migration function to handle existing localStorage data
const migrateFromLocalStorage = () => {
  const sessionId = generateSessionId();
  
  // Check if we already migrated for this session
  if (sessionStorage.getItem(`migrated_${sessionId}`)) {
    return;
  }
  
  // Check for existing localStorage data and migrate it
  const oldToken = localStorage.getItem('token');
  const oldUserType = localStorage.getItem('userType');
  const oldUser = localStorage.getItem('user');
  const oldHospital = localStorage.getItem('hospital');
  
  if (oldToken) {
    sessionStorage.setItem(`token_${sessionId}`, oldToken);
    console.log('🔍 Migrated token from localStorage to sessionStorage');
  }
  
  if (oldUserType) {
    sessionStorage.setItem(`userType_${sessionId}`, oldUserType);
    console.log('🔍 Migrated userType from localStorage to sessionStorage');
  }
  
  if (oldUser) {
    sessionStorage.setItem(`user_${sessionId}`, oldUser);
    console.log('🔍 Migrated user data from localStorage to sessionStorage');
  }
  
  if (oldHospital) {
    sessionStorage.setItem(`hospital_${sessionId}`, oldHospital);
    console.log('🔍 Migrated hospital data from localStorage to sessionStorage');
  }
  
  // Mark as migrated for this session
  sessionStorage.setItem(`migrated_${sessionId}`, 'true');
};

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Enable credentials for all requests
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth headers if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Migrate any existing localStorage data
    migrateFromLocalStorage();
    
    // Add auth token to headers if available
    const sessionId = generateSessionId();
    const token = sessionStorage.getItem(`token_${sessionId}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔍 Debug - Adding token to request:", config.url, "Session:", sessionId);
    } else {
      console.log("🔍 Debug - No token found for request:", config.url, "Session:", sessionId);
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
      const sessionId = generateSessionId();
      // Clear stored authentication data for this session only
      sessionStorage.removeItem(`token_${sessionId}`);
      sessionStorage.removeItem(`user_${sessionId}`);
      sessionStorage.removeItem(`hospital_${sessionId}`);
      sessionStorage.removeItem(`userType_${sessionId}`);
      
      // Redirect to login page
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for session management
export const getSessionId = () => generateSessionId();

export const setSessionData = (key, value) => {
  const sessionId = generateSessionId();
  sessionStorage.setItem(`${key}_${sessionId}`, typeof value === 'object' ? JSON.stringify(value) : value);
};

export const getSessionData = (key) => {
  const sessionId = generateSessionId();
  const data = sessionStorage.getItem(`${key}_${sessionId}`);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

export const clearSessionData = () => {
  const sessionId = generateSessionId();
  sessionStorage.removeItem(`token_${sessionId}`);
  sessionStorage.removeItem(`user_${sessionId}`);
  sessionStorage.removeItem(`hospital_${sessionId}`);
  sessionStorage.removeItem(`userType_${sessionId}`);
};

export default axiosInstance; 