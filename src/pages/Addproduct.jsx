import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../Axios";
import Sidebar from "../components/Admin/Sidebar";
import Navbar from "../components/Admin/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
export default function Addproduct() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const res = await api.get("/category/list");
        console.log(res.data.categories);
        setCategories(res.data.categories);
      } catch (err) {
        console.log("Error Fetching data:", err);
      }
    };
    FetchCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    if (image) formData.append("productimg", image);
    try {
      const res = await api.post("product/productadd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      alert(res.data.message);
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setBrand("");
      setImage(null);
      setCategory("");
      if (res.status === 200 || res.status === 201) {
        navigate("/productview");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add Product");
    }
  };
  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar open={open} />
        <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
          <Navbar open={open} setOpen={setOpen} />
          <div className="p-8  rounded-lg shadow  max-w-lg mx-auto mt-40">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Add Product
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 justify-center items-center"
            >
              <input
                type="text"
                placeholder="NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
                required
              />
              <input
                type="number"
                placeholder="PRICE"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
                required
              />
              <input
                type="number"
                placeholder="STOCK"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
                required
              />
              <textarea
                type="text"
                placeholder="DESCRIPTION"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
              ></textarea>

              <input
                type="text"
                placeholder="BRAND"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
                required
              />
              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Product Preview"
                    className="w-40 h-40 object-cover rounded-md border shadow-sm"
                  />
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-700 py-2 px-4 rounded-md cursor-pointer"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
