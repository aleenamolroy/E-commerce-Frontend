import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Navbar from "../components/Admin/Navbar";
import api from "../Axios";
import { PrefetchPageLinks, useParams } from "react-router-dom";
export default function OrdersView() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [iscancelled, setiscancelled] = useState({});
  const paymentStatusOptions = ["pending", "paid", "failed"];
  const shippingStatusOptions = ["pending", "shipped", "delivered"];
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("order/vieworders");
        setOrders(res.data.orders || []);
        console.log(res.data.orders);
      } catch (err) {
        console.log(err);
        console.error("API Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to load orders");
      }
    };
    fetchOrder();
  }, []);
  const handleLocalChange = (orderId, field, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, [field]: value } : order
      )
    );
  };
  const handleUpdate = async (order) => {
    try {
      const payload = {
        paymentStatus: order.paymentStatus,
        shippingStatus: order.shippingStatus,
      };

      const res = await api.put(`/order/update/${order._id}`, payload);
      console.log("API response:", res.data);
      if (res.data.updateOrder) {
        setOrders((prev) =>
          prev.map((o) => (o._id === order._id ? res.data.updatedOrder : o))
        );
      }
      console.log(res.data.updateOrder);
      console.log("hello");
      alert("Order updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load orders");
    }
  };

  const handlecancellation = async (orderId) => {
    const confirmed = confirm("Are you sure you want to cancel this product");
    if (!confirmed) return;
    try {
      const res = await api.delete(`order/cancel/${orderId}`, {
        data: { shippingStatus: "cancelled" },
      });
      console.log(res.data);
      if (res.status === 200) {
        alert(`order ${orderId} has been canceled`);
        setCancelledOrders((prev) => ({ ...prev, [orderId]: true }));
      } else {
        alert("cancelation failed please try again.");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to cancel order something went wrong"
      );
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar open={open} />
        <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
          <Navbar open={open} setOpen={setOpen} />
          <div className="mt-30">
            <h1 className="text-2xl font-bold mb-4 text-center ">Orders</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">User</th>
                    <th className="py-2 px-4 border">Items</th>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">
                      Payment and shipping status
                    </th>
                    <th className="py-2 px-4 border">Cancel order</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{order.user}</td>
                      <td className="py-2 px-4 border">
                        <ul className="list-disc list-inside">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.product.name} X {item.quantity}( ₹
                              {item.subtotal})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4 border">₹{order.Amount}</td>
                      <td className="py-2 px-4 border">
                        {/* <span className="border-1 px-3 bg-amber-200 rounded py-1">
                          {order.payment}
                        </span> */}
                        <select
                          value={order.payment}
                          onChange={(e) =>
                            handleLocalChange(
                              order._id,
                              "paymentStatus",
                              e.target.value
                            )
                          }
                          className="border ml-3 px-3 py-1 rounded"
                        >
                          {paymentStatusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {/* <span className="ml-3 px-3 py-1  border-1 bg-amber-200">
                          {order.status}
                        </span> */}

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleLocalChange(
                              order._id,
                              "shippingStatus",
                              e.target.value
                            )
                          }
                          className="border ml-3 px-3 py-1 rounded"
                        >
                          {shippingStatusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleUpdate(order)}
                          className="bg-blue-700 px-3 py-1 ml-4"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handlecancellation(order._id)}
                          disabled={order.status === "cancelled"}
                          className={`px-4 py-2 rounded text-white font-medium transition 
    ${
      order.status === "cancelled"
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-red-700 hover:bg-red-600 cursor-pointer"
    }`}
                        >
                          {order.status === "cancelled"
                            ? "Cancelled"
                            : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
