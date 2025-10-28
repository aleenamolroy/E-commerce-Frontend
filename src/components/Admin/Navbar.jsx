import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
export default function Navbar({open,setOpen}) {
  return (
    <>
    <nav className="px-4  bg-amber-50 shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX size={28} /> : <HiMenu size={28} />}
          </div>

          <div className="flex items-center space-x-2 ml-0">
            <img src={logo} alt="logo" className="h-30 w-auto ml-0" />
          </div>
          <div>
            <h3 className="font-bold text-2xl font-serif">Zairah</h3>
          </div>
          <div className="flex items-center space-x-2">
          <FaUserCircle size={28} className="text-gray-700" />
          <span className="text-xl font-semibold text-gray-800">Admin</span>
        </div>
        </div>
      </nav>
    </>
  );
}
