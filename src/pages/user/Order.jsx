import React, { useEffect, useState } from "react";
import api from "../../Axios";
import Navbar from "../../components/User/Navbar";
import { data } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await api.get("order/showorder");
      const sortOrders=res.data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
      setOrders(sortOrders); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Load Order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  const handleCancellation = async (id) => {
    try {
      const res = await api.delete(`order/cancelorder/${id}`, {
        data: { shippingStatus: "cancelled" },
      });
      fetchOrder();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="max-w-3xl mx-auto my-10 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>

        {orders?.map((order, i) => (
          <div
            key={order._id || i}
            className="mb-8 border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{i + 1}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
                  Shipping: {order.shippingStatus}
                </span>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Payment: {order.paymentStatus}
                </span>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                  Total: ₹{order.totalPrice}
                </span>
              </div>
            </div>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 border-t pt-4 mt-4"
              >
                <img
                  src={`${api.defaults.baseURL}/uploads/${item.product.productimg}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    {item.category?.discription || item.category?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Subtotal:{" "}
                    <span className="font-medium text-gray-800">
                      ₹{item.subtotal.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              {order.shippingStatus === "cancelled" ? (
                <button className="px-4 py-2 text-sm font-medium bg-gray-400 cursor-not-allowed text-white rounded hover:bg-gray-400 transition">
                  Cancelled
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleCancellation(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
