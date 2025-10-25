import React, { useEffect, useState } from "react";
import api from "../../Axios";
import { Link } from "react-router-dom";
export default function Categorycard() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await api.get("product/list");
        setproducts(res.data.products);
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };
    fetchproducts();
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden block"
          >
            <img
              src={`${api.defaults.baseURL}/uploads/${product.productimg}`}
              alt={product.name}
              className="w-full h-100 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-700">
              {product.name}
            </h3>
            <p className="text-blue-600 font-bold mt-1">${product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
