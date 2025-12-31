import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Hotels from "./pages/Hotels";

import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogsDetails";

import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  // ✅ Check if current route is admin
  const isAdminRoute = location.pathname.startsWith("/dashboard/admin");

  return (
    <>
      <ScrollToTop />
      {/* ❌ Hide Navbar for Admin */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* User & Employee */}
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />

        {/* ✅ ADMIN PANEL */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>

      {/* ❌ Hide Footer for Admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
