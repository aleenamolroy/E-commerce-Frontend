import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import userlogo from "../../assets/download.png";
import { useAuth } from "../../pages/user/Authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../Axios";
import {
  faCartShopping,
  faBoxOpen,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/user/Cartcontext";
export default function Navbar() {
  const { user, logout } = useAuth();
  // const {cartCount}=useCart()
  const navigate=useNavigate()
  const handlelogout=async ()=>{
    try{
    await api.post('logout',{withCredentials:true})
    logout()
    navigate('/Home')
    }
    catch(err){
        alert(err.response?.data?.message)
    }

  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-20 w-20 " />
            <span className="text-2xl font-bold text-gray-800 font-serif ml-30">
              Zairah
            </span>
          </div>
          <div className="flex items-center space-x-2 relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-35 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Products.."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  SignIn
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="flex items-center space-x-1 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                  {/* <span>Cart({cartCount})</span> */}
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center space-x-1 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="w-5 h-5" />
                  <span>Orders</span>
                </Link>
                <div className="relative space-y-1 flex">
                  <Link to="/ViewProfile"> 
                    <img
                      src={userlogo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </Link>
                </div>
                <div>
                  <p>{user.name}</p>
                </div>
                <div><button className="bg-red-600 rounded-md p-2" onClick={()=>handlelogout()}>Logout</button></div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
