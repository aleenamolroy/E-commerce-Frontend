import React, { useEffect, useState } from "react";
import Navbar from "../../components/User/Navbar";
import api from "../../Axios";
import { useNavigate } from "react-router-dom";

export default function Cartview() {
  const [cart, setCart] = useState(null);
  const navigate=useNavigate()
    const Fetchcart = async () => {
      try {
        const res = await api.get("cart/showcart");
        setCart(res.data[0]);
        console.log(cart)
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };
    
  
  useEffect(() => {
    Fetchcart();
  },[]);
  const handlequantityinc = async (productId, currentQuantity) => {
    try {
      // console.log("Increment clicked for:", productId, "Current quantity:", currentQuantity);
      
      const newQuantity = currentQuantity + 1;
      const res = await api.put(
        `cart/updatecart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await Fetchcart()
    } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
      console.error("Error in handlequantityinc:", err);
    }
  };
  const handlequantitydec=async(productId,currentQuantity)=>{
    try{
        const newQuantity=currentQuantity-1
        await api.put(`cart/updatecart/${productId}`,{quantity:newQuantity})
        await Fetchcart()
    }
    catch(err){
            alert(err.response?.data?.message || "Something went wrong");

    }
  }
  const handleremove=async(productId,quantity)=>{
    try{
        console.log(quantity)
        await api.delete(`cart/cartdelete/${productId}`,{data:{quantity:quantity}})
        await Fetchcart()
    }
    catch(err){
            alert(err.response?.data?.message || "Something went wrong");

    }
  }
  const placeOrder= async(cartItems)=>{
        try{
            const res=await api.post('order/createOrder',{items:cartItems})
            navigate('/order')
        }
        catch(err){
            alert(err.response?.data?.message)
            console.log(err)
        }
    }
  if (!cart) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
          Your cart is empty 🛒
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={`http://localhost:3000/uploads/${item.product.productimg}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600">₹{item.product.price}</p>
                  <p className="text-sm text-gray-400">
                    Category: {item.category.name|| "N/A"}
                  </p>

                  <div className="flex items-center mt-2">
                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={()=>handlequantitydec(item.product.id,item.quantity)}>
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        handlequantityinc(item.product.id, item.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-gray-800 font-semibold">
                    ₹{item.subtotal}
                  </p>
                  <button className="text-red-500 hover:text-red-700 mt-2" onClick={()=>handleremove(item.product.id,item.quantity)}>
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{cart.totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹100</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-gray-800 text-lg">
              <span>Total</span>
              <span>₹{cart.totalPrice}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>placeOrder()}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
