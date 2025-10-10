import axios from "axios";
import React from "react";
import { useState } from "react";
import api from "../Axios";
import {  useNavigate } from "react-router-dom";
export default function Register() {
  const navigate=useNavigate()
  const [form, setfrom] = useState({ name: "", email: "", password: "" });
  const [profileImage, setProfileImage] = useState(null);
  const handleChange = (e) => {
    setfrom({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    try {
      const res = await api.post("user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/login");
      } else {
        alert("Registration failed. please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 font-serif">
          Sign Up
        </h2>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col space-y-4 items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            required
          />
          <input
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleImageChange}
            className="border-1 border-gray-400 w-full text-gray-600 rounded-md p-2 max-w-sm mx-auto"
          />
          <button
            type="submit"
            className="border-1 border-gray-400 bg-blue-500 rounded-md p-2  font-serif w-full max-w-sm mx-auto"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
