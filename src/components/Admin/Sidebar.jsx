import React from "react";
import { FaArrowLeft, FaArrowRight, FaBox, FaHome, FaShippingFast, FaTachometerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axois from "axios"
import api from "../../Axios";
export default function Sidebar({ open }) {
  const navigate=useNavigate()
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, label: "Users", path: "/userview" },
    { icon: <FaBox />, label: "Products", path: "/productview" },
    { icon: <FaBox />, label: "Category", path: "/categoryview" },
    {icon:<FaShippingFast/>,label:"Orders",path:'/orderview'},
    { icon: <FaArrowRight />, label: "Logout", path: "/adminlogout" }
  ];
  const handlePath=async (path)=>{
    if(path === '/adminlogout'){
      await api.post('/logout',{},{withCredentials:true})
      localStorage.removeItem("user")
      navigate("/login")
    }else{
      navigate(path)
    }
  }
  return (
    <aside className={`bg-blue-950 text-white h-screen p-4 fixed top-20 left-0 transition-transform duration-300 z-50
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64` }>
    <div className="mt-20 ">
        <ul className="space-y-4 px-4">
        {menuItems.map((items,i)=>(
            <li key={i} onClick={()=>handlePath(items.path)} className="flex items-center space-x-3 hover:bg-blue-800 p-2 rounded cursor-pointer">
                  {items.icon} <span>{items.label}</span>  

            </li>
        ))
    }
      </ul>
    </div>
    </aside>
  );
}
