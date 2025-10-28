import React from "react";
import axios from "axios";
const api = axios.create({
  baseURL: "http://13.53.217.189",
  withCredentials: true,
});
export default api;
