import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Navbar from "../components/Admin/Navbar";
import api from "../Axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Updateproduct() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [existingimg, setexsitingimg] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const res = await api.get("/category/list");
        setCategories(res.data.categories);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };
    const FetchProduct = async () => {
      try {
        const res = await api.get(`product/productsearch/${id}`);
        const product = res.data.product;
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription  (product.description);
        setBrand(product.brand);
        setexsitingimg(product.productimg);
        setCategory(product.category);
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };
    FetchCategories();
    FetchProduct();
  }, [id]);
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
      const res = await api.put(`product/productUpdate/${id}`, formData, {
        headers: { "content-type": "multipart/formdata" },
      });
      alert(res.data.message);
      navigate("/productview");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col ml-0 md:ml-64">
        <Navbar open={open} setOpen={setOpen} />
        <div className="p-8 rounded-lg shadow max-w-lg mx-auto mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Update Product
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
            {existingimg && (
              <div className="my-2">
                <img
                  src={`http://localhost:3000/uploads/${existingimg}`}
                  alt="product"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"
            />
            <button
              type="submit"
              className="bg-blue-700 py-2 px-4 rounded-md cursor-pointer"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
