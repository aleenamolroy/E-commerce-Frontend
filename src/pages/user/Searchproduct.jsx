import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Axios";
import Navbar from "../../components/User/Navbar";
import { Link } from "react-router-dom";
export default function Searchproduct() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("name");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (searchTerm) {
          const res = await api.get(
            `product/searchProduct?name=${encodeURIComponent(searchTerm)}`
          );
          setProducts(res.data.products || []);
        }
      } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
      }
    };
    fetchProduct();
  }, [searchTerm]);

  return (
    <>
    
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Search results for <span className="text-indigo-600">"{searchTerm}"</span>
        </h2>

        {products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={`http://localhost:3000/uploads/${product.productimg}` || "https://via.placeholder.com/300x300?text=No+Image"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.category?.name || "Uncategorized"}
                  </p>
                  <p className="text-indigo-600 font-semibold mt-2">
                    ₹{product.price || "N/A"}
                  </p>
                    <Link to={`/product/${product._id}`}>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
                    View Details
                  </button>
                    </Link>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <img
              src="https://illustrations.popsy.co/gray/no-search-results.svg"
              alt="No products found"
              className="w-60 mx-auto mb-6 opacity-90"
            />
            <p className="text-gray-600 text-lg">No products found for your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
