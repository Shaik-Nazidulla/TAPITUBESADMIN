import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; 
import Logo from "../assets/Logo.png";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Assuming you store user info in redux -> auth.user
  const user = useSelector((state) => state.auth.user);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-black/70 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Company Logo" className="h-10 w-auto" />
          </div>

          {/* Center: Nav Links */}
          <nav className="flex space-x-1">
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isActive("/products")
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-[#FFFFFF] hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <span>Products</span>
            </Link>

            <Link
              to="/persons"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isActive("/persons")
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-[#FFFFFF] hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <span>Persons</span>
            </Link>

            <Link
              to="/blogs"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isActive("/blogs")
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-[#FFFFFF] hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <span>Blogs</span>
            </Link>
          </nav>

          {/* Right: User Info Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className=" bg-[#405FFC] hover:to-blue-600 hover:cursor-pointer text-[#ffffff] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
            >
              <span>{user?.email || "Admin"}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute  right-0 mt-2 w-20 bg-[#405FFC] shadow-lg rounded-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[#ffffff] hover:cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
