// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaCrown } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg relative z-50 border-b border-red-600/30">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 relative z-50">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center space-x-2 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="/mk_construction_logo_no_contact.jpeg"   // note the leading slash
                alt="MK Construction"
                className="w-10 h-10 object-cover rounded-lg"
              />

            </div>
            <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MK Construction
            </h1>
            <p className="text-xs text-gray-400 -mt-1 hidden sm:block">Building Dreams</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
          </Link>

          <Link
            to="/designs"
            className="px-4 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium relative group"
          >
            Gallery
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
          </Link>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="relative px-4 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium group flex items-center space-x-1"
          >
            <FaShoppingCart className="text-lg" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full border-2 border-gray-900 font-bold animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Admin Dashboard Link */}
          {user && user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium relative group flex items-center space-x-1"
            >
              <FaCrown className="text-yellow-400" />
              <span>Admin</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
            </Link>
          )}

          {/* User Section */}
          <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-700">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-800/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <FaUser className="text-sm" />
                  </div>
                  <span className="font-medium max-w-[120px] truncate">
                    {user?.name || user?.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-red-600/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-red-600/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none z-50 p-2 rounded-lg hover:bg-red-900/30 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`${mobileOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-gradient-to-b from-gray-900 to-black shadow-2xl border-t border-red-600/30 px-6 py-6 space-y-4 z-40"
              : "hidden"
            } md:hidden`}
        >
          <Link
            to="/"
            className="py-3 px-4 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium border-l-2 border-transparent hover:border-red-500"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/designs"
            className="py-3 px-4 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium border-l-2 border-transparent hover:border-red-500"
            onClick={() => setMobileOpen(false)}
          >
            Gallery
          </Link>

          {/* Cart with badge - Mobile */}
          <Link
            to="/cart"
            className="relative py-3 px-4 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium border-l-2 border-transparent hover:border-red-500 flex items-center space-x-2"
            onClick={() => setMobileOpen(false)}
          >
            <FaShoppingCart />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="ml-auto bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Admin Dashboard Link - Mobile */}
          {user && user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="py-3 px-4 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium border-l-2 border-transparent hover:border-yellow-400 flex items-center space-x-2"
              onClick={() => setMobileOpen(false)}
            >
              <FaCrown className="text-yellow-400" />
              <span>Admin Dashboard</span>
            </Link>
          )}

          {/* User Section - Mobile */}
          <div className="pt-4 mt-4 border-t border-gray-700">
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-gray-800/50 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <FaUser />
                  </div>
                  <div>
                    <div className="font-medium">
                      {user?.name || user?.username}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user.role === "admin" ? "Administrator" : "User"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 font-medium shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/signin"
                  className="py-3 px-4 rounded-lg hover:bg-red-900/30 hover:text-red-200 transition-all duration-300 font-medium text-center border-l-2 border-transparent hover:border-red-500"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-800 py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 font-medium shadow-lg text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </nav>
  );
}