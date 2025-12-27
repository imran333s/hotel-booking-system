import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogsDetails";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
         {/* Role-based dashboards */}
  <Route path="/dashboard/admin" element={<AdminDashboard />} />
  <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
  <Route path="/dashboard/user" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
