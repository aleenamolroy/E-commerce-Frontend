import React, { useState } from "react";
import api from "../Axios";
import Navbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";
import { useNavigate } from "react-router-dom";
export default function Addcategory() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("category/categoryAdd", { name, description });
      console.log(res.data);
      setName("");
      setDescription("");
      if (res.status === 200) navigate("/categoryview");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add category");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
        <Navbar open={open} setOpen={setOpen} />
        <div className="mt-50">
          <h1 className="text-center">Add Category</h1>
          <form
            onSubmit={handlesubmit}
            className="flex flex-col space-y-4 justify-center items-center"
          >
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            />
            <textarea
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            ></textarea>

            {/* <button type='submit' onClick={onCancel}>Cancel</button> */}
            <button
              type="submit"
              className="bg-blue-700 py-2 px-4 rounded-md cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
