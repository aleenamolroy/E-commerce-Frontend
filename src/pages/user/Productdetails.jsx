import React, { useEffect, useState } from "react";
import { useAsyncValue, useNavigate, useParams } from "react-router-dom";
import api from "../../Axios";
import Navbar from "../../components/User/Navbar"; // Use User Navbar if it’s for users
import { useAuth } from "./Authcontext";
export default function Productdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {user}=useAuth()
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`product/productsearch/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }
const handlecart=async ()=>{
    
    try{
      if(!user){
        navigate('/login')
        return;
    }
        const res=await api.post(`cart/Addcart/${id}`,{quantity:1},{withCredentials:true})
        console.log(res);
        
        alert(res.data?.message)
    }
    catch(err){
        alert(err.response?.data?.message)
    }
}
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:3000/uploads/${product.productimg}`}
                alt={product.name}
                className="w-64 h-70 object-cover rounded-lg shadow"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                {product.name}
              </h1>
              <p className="text-blue-600 font-bold text-2xl mb-4">
                ₹{product.price}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-500 mb-2">Brand: {product.brand}</p>
              <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={handlecart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
