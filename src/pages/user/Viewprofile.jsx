import React, { useEffect, useState } from "react";
import api from "../../Axios";
import Navbar from "../../components/User/Navbar";
import { Link } from "react-router-dom";
export default function Viewprofile() {
  const [user, setUsers] = useState(null);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await api.get("user/viewprofile");
        console.log(res.data);
        setUsers(res.data.user);
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };
    fetchuser();
    console.log(user);
  }, []);
  
  return (
    <>
     
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
            

      <div className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {user && (
          <div className="flex flex-col items-center justify-center p-6">
                        <h2 className="font-serif text-blue-500 text-2xl">Hi {user.name} welcome to Zairah</h2>

            <img
              className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover"
              src={`${api.defaults.baseURL}uploads/${user.profile_image}`}
              alt="User Avatar"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            
            <div className="mt-4 flex space-x-4">
                <Link to="/update">
           
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Update
              </button>
               </Link>
               <Link to="/Home">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition">
                Back
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      </div>

    </>
  );
}
