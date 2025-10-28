
import React from 'react'
import axios from "axios";

const local = "http://localhost:3000/";
const production = "http://13.53.217.189/api/";

const api = axios.create({
  baseURL: window.location.hostname === "localhost" ? local : production,
  withCredentials: true,
});


export default api;
