import axios from "axios";

const API = axios.create({
  baseURL: "https://child-vaccination.onrender.com"/api
,   // ✅ CHANGED
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
