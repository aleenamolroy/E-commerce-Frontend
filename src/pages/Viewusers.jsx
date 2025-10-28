import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Navbar from "../components/Admin/Navbar";
import api from "../Axios";
export default function Viewusers() {
  const [open, setOpen] = useState(false);
  const [users, setuser] = useState([]);
  useEffect(() => {
    const userFetch = async () => {
      try {
        const res = await api.get("admin/userlist");
        setuser(res.data.users || []);
      } catch (err) {
        if (err.response) {
          const status = err.response.status;
          const message = err.response.data?.message || "Something went wrong!";
          if (status === 404) {
            alert(message);
          } else {
            alert("Network or server error");
          }
        }
      }
    };
    userFetch()
  },[]);
  const handlestatus=async (id, currentstatus)=>{
    const newstatus= currentstatus  === "active"?"inactive":"active";
    try{
        const res=await api.put(`admin/changestatus/${id}`,{status:newstatus})
        alert(res.data.message)
        setuser((prev)=>prev.map((u)=>u._id === id ? {...u,status:newstatus}:u))
    }catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to change status");
    }
  }
  return (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar open={open} />

    {/* Main content */}
    <div className="flex flex-1 flex-col transition-all duration-300 ml-0 md:ml-64">
      <Navbar open={open} setOpen={setOpen} />

      <div className="p-4 sm:p-6 lg:p-8 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Users</h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 break-all">{user.email}</td>
                  <td className="py-3 px-4">
                    {user.profile_image ? (
                      <img
                        src={`${api.defaults.baseURL}uploads/${user.profile_image}`}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded-full border"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className={`px-4 py-1.5 rounded text-white text-sm font-medium ${
                        user.status === "active"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={() => handlestatus(user._id, user.status)}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}