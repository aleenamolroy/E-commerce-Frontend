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
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
        <Navbar open={open} setOpen={setOpen} />
        <div className="mt-30 ml-20">
          <h1 className="text-2xl font-bold mb-4 text-center ">Users</h1>
          <table className="w-full table-fixed">
            <thead>
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Profile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} >
                  <td>
                    <div>{user.name}</div>
                  </td>
                  <td>
                    <div>{user.email}</div>
                  </td>
                  <td>
                    <div>
                      {user.profile_image ? (
                        <img
                          src={`http://localhost:3000/uploads/${user.profile_image}`}
                          alt={user.name}
                          className="w-30 h-20 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      
                      <button className={`px-3 py-1 rounded ${
                        user.status === 'active'
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                      onClick={()=>handlestatus(user._id,user.status)}>{user.status === 'active'?"Active":"Inactive"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
