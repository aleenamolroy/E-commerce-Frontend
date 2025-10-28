import React, { useEffect } from "react";
import Navbar from "../../components/User/Navbar";
import banner from "../../assets/banner6.jpg";
import Categorycard from "../../components/User/Categorycard";
import api from "../../Axios";
export default function Home() {
 
  return (
    <>
    {/* <Navbar/> */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0  bg-opacity-40"></div>

        <div className="relative z-10 max-w-3xl text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-playwrite font-extrabold">
            Welcome to <span className="text-blue-800 font-serif">Zairah</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-mono">
            Discover the latest fashion trends and best deals on clothing,
            accessories, and more. Shop now and elevate your style!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            
            {/* <a
              href="/productview"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
            >
              Shop Now
            </a> */}
            
          </div>
        </div>
      </section>
      <Categorycard/>
    </>
  );
}
