import React, { useContext, useState } from "react";
import axios from "axios";
import api from "../../Axios";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import { Authcontext, useAuth } from "./Authcontext";
export default function Userlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "user/login",
        { email, password },
        { withCredentials: true }
      );
      login({
        id: res.data._id.toString(),
        type: res.data.type,
        email: res.data.email,
        name:res.data.name,
        profile_image:res.data.profile_image  
      });
      
      navigate("/Home");
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "something went to wrong";
        if (status === 401) {
          alert(message);
        } else if (status === 403) {
          alert(message);
        } else {
          alert("Network error or server not responding!");
        }
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 font-serif">
          Sign In
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm"
            required
          />

          <button
            type="submit"
            className="border-1 border-gray-400 bg-blue-500 rounded-md p-2 w-full max-w-sm font-serif"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
