import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../Axios";
const Cartcontext = createContext();
export function Cartprovider({ children }) {
  const [cartCount, setcartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("cart/countcart");
      setcartCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const incrementCart = () => setcartCount((prev) => prev + 1);
    const decrementCart = () => setcartCount(prev => Math.max(prev - 1, 0));
  const resetcart = (count) => setcartCount(count);

  return (
    <Cartcontext.Provider value={{ cartCount, incrementCart,decrementCart, resetcart,fetchCart }}>
      {children}
    </Cartcontext.Provider>
  );
}
export const useCart = () => useContext(Cartcontext);
