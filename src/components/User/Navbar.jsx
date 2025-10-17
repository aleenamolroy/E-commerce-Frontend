import React, { useState,useEffect } from "react";
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
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/user/Cartcontext";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  // const [Count,setCount] = useState(0)
  const handlelogout = async () => {
    try {
      await api.post("logout", { withCredentials: true });
      logout();
      navigate("/Home");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };
  //

  const handlesearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchTerm)}`);
      setsearchTerm("");
    }
  };
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
            <button
              onClick={handlesearch}
              className="absolute left-40 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              type="text"
              placeholder="Search Products.."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlesearch();
                }
              }}
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
                <Link to="/Home">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="flex items-center space-x-1 hover:text-blue-600 transition"
                  />
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center space-x-1 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="w-5 h-5 relative"
                  />
                  {cartCount > 0 && (
                    <span className="absolute top-2  bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/order"
                  className="flex items-center space-x-1 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="w-5 h-5" />
                  <span>Orders</span>
                </Link>
                <div className="relative space-y-1 flex">
                  <Link to="/profile">
                    <img
                      src={`http://localhost:3000/uploads/${user.profile_image}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </Link>
                </div>
                <div>
                  <p>{user.name}</p>
                </div>
                <div>
                  <button
                    className="bg-red-600 rounded-md p-2"
                    onClick={() => handlelogout()}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
