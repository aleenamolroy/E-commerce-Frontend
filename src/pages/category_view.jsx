import React, { useEffect, useState } from "react";
import Navbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";
import axios from "axios";
import api from "../Axios";
import { Link } from "react-router-dom";
export default function Categoryview() {
  const [open, setOpen] = useState(false);
  const [categories, setCategory] = useState([]);

  const CategoriesFetch = async () => {
    try {
      const response = await api.get("category/list");
      console.log(response.data);
      setCategory((response.data.categories|| []).reverse());
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "something went wrong!";
        if (status === 404) {
          alert(message);
        } else {
          alert("Network or server error");
        }
      }
    }
  };
  // CategoriesFetch();

  useEffect(() => {
    CategoriesFetch();
  }, []);
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want delete this category?");
    if (!confirmed) return;
    try {
      await api.delete(`category/categoryDelete/${id}`);
      alert("category deleted successsfully");
      CategoriesFetch();
    } catch (err) {
      alert(err.response?.data.message || "failed to delete");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
        <Navbar open={open} setOpen={setOpen} />

        <div className="mt-30">
          <h1 className="text-2xl font-bold mb-4 text-center ">Categories</h1>
          <Link to="/addcategory">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mb-6 ml-6">
              Add Category
            </button>
          </Link>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link to={`/updatecategory/${category._id}`}>
                        <button className="text-blue-600  hover:underline">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
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
