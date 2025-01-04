import axiosLib from "axios";

// const BASE_URL = "https://freelance-api.deelance.com";
const BASE_URL = "http://localhost:4000";

const axios = axiosLib.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axiosLib.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios;
