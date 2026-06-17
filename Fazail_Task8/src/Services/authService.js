import axios from "axios";

// Base URL for all ReqRes API requests
const BASE_URL = "https://reqres.in/api";

// Common configuration object used in every request
const config = {
  headers: {
    // API key required by ReqRes for authenticated access
    "x-api-key": "free_user_3EyzXs2NonQYWZ1nu94ioUY2Myu",

    // Specifies that request data is sent as JSON
    "Content-Type": "application/json",
  },
};


export const loginUser = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/login`, // Login endpoint
    data,                // Request body
    config               // Headers/configuration
  );

  return response.data;
};


export const registerUser = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/register`, // Registration endpoint
    data,                   // Request body
    config                  // Headers/configuration
  );

  return response.data;
};