import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Navbar from "../components/Admin/Navbar";
import { use } from "react";
import api from "../Axios";
import { Link } from "react-router-dom";
export default function Productview() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
 
    const productFetch = async () => {
      try {
        const res = await api.get("product/list");
        setProducts(res.data.products || []);
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
    // productFetch();
    useEffect(()=>{
      productFetch()
    },[])
    
  const handleDelete=async(id)=>{
    const confirmed=confirm("Are you sure you want to delete this product")
    if(!confirmed) return;
    try{
      await api.delete(`product/productDelete/${id}`)
      alert('product deleted successfully')
      productFetch()
    }
    catch(err){
      alert(err.response?.data.message || "failed to delete")
    }
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
        <Navbar open={open} setOpen={setOpen} />
        <div className="mt-30">
          <h1 className="text-2xl font-bold mb-4 text-center ">Products</h1>
          <Link to="/addproduct">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mb-6 ml-6">
              Add Product
            </button>
          </Link>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{product.price}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </td>
                  <td className="px-6 py-4">
                    {product.productimg ? (
                      <img
                        src={`http://localhost:3000/uploads/${product.productimg}`}
                        alt={product.name}
                        className="w-30 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {product.category?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link to={`/editproduct/${product._id}`}>
                      <button className="text-blue-600  hover:underline">
                        Edit
                      </button>
                      </Link>
                      
                      <button className="text-red-600 hover:underline" onClick={()=>handleDelete(product._id)}>
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
