import React, { useState } from "react";
import api from "../Axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("admin/AdminLogin", { email, password });
      console.log({ email, password });
      const userdata = {
        id: res.data._id.toString(),
        type: res.data.type,
      };
      // console.log("Login response:", res.data);
      localStorage.setItem("user", JSON.stringify(userdata));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "something went wrong";
        if (status === 401) {
          alert("Unauthorized :" + message);
        } else {
          alert("Network error or server not responding!");
        }
      }
    }
    console.log("Login attempted with :", { email, password });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 font-serif">
          Admin Sign In
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
