import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Admindashboard from "./pages/Admindashboard";
import AdminRoute from "./pages/AdminRoute";
import Userlogin from "./pages/user/Userlogin";
import Categoryview from "./pages/category_view";
import Addcategory from "./pages/Addcategory";
import UpdateCategory from "./pages/UpdateCategory";
import Productview from "./pages/Productview";
import Addproduct from "./pages/Addproduct";
import Updateproduct from "./pages/Updateproduct";
import Viewusers from "./pages/Viewusers";
import OrdersView from "./pages/OrdersView";
import { Authprovider } from "./pages/user/Authcontext";
import Home from "./pages/user/Home";
import Productdetails from "./pages/user/Productdetails";
import Cartview from "./pages/user/cartView";
import { Cartprovider } from "./pages/user/Cartcontext";
import Viewprofile from "./pages/user/Viewprofile";
import Order from "./pages/user/Order";
import Updateprofile from "./pages/user/Updateprofile";
import Searchproduct from "./pages/user/Searchproduct";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Admindashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/categoryview"
          element={
            <AdminRoute>
              <Categoryview />
            </AdminRoute>
          }
        />
        <Route
          path="/addcategory"
          element={
            <AdminRoute>
              <Addcategory />
            </AdminRoute>
          }
        />
        <Route
          path="/updatecategory/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/productview"
          element={
            <AdminRoute>
              <Productview />
            </AdminRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <AdminRoute>
              <Addproduct />
            </AdminRoute>
          }
        />
        <Route
          path="/editproduct/:id"
          element={
            <AdminRoute>
              <Updateproduct />
            </AdminRoute>
          }
        />
        <Route
          path="/userview"
          element={
            <AdminRoute>
              <Viewusers />
            </AdminRoute>
          }
        />
        <Route
          path="/orderview"
          element={
            <AdminRoute>
              <OrdersView />
            </AdminRoute>
          }
        />
        <Route
          path="/*"
          element={
            <Authprovider>
              <Cartprovider>
                <UserRouter />
              </Cartprovider>
            </Authprovider>
          }
        />
        <Route
          path="/login"
          element={
            <Authprovider>
              <Cartprovider>
                <Userlogin />
              </Cartprovider>
            </Authprovider>
          }
        />

      </Routes>
    </div>
  );
}
import {
  Routes as UserRoutesWrapper,
  Route as UserRoute,
} from "react-router-dom";
import Navbar from "./components/User/Navbar";

function UserRouter() {
  return (
    <>
     <Navbar/>
    <UserRoutesWrapper>
      <UserRoute path="/Home" element={<Home />} />
      <UserRoute path="/" element={<Home />} />

      <UserRoute path="/product/:id" element={<Productdetails />} />
      <UserRoute path="/cart" element={<Cartview />} />
      <UserRoute path="/order" element={<Order />} />
      <UserRoute path="/profile" element={<Viewprofile />} />
      <UserRoute path="/update" element={<Updateprofile />} />
      <UserRoute path="/search" element={<Searchproduct />} />
    </UserRoutesWrapper>
    </>
  );
}
