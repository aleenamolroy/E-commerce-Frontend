import React, { createContext, useContext, useEffect, useState } from "react";
export const Authcontext = createContext();
export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user");
  };
  const Updateuser=(Updateuser)=>{
    setUser(Updateuser)
    localStorage.setItem("user",JSON.stringify(Updateuser))
  }
  return (
    <Authcontext.Provider value={{ user, login, logout, Updateuser }}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth=()=>useContext(Authcontext)
