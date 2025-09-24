// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { 
  FaTachometerAlt, 
  FaPalette, 
  FaUsers, 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaPlus, 
  FaBars,
  FaBox,
  FaUserCircle
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [designCount, setDesignCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.get("/designs/count")
      .then(res => setDesignCount(res.data.count))
      .catch(err => console.error("Error fetching designs count:", err));

    api.get("/users/count")
      .then(res => setUserCount(res.data.count))
      .catch(err => console.error("Error fetching users count:", err));

    api.get("/orders/count")
      .then(res => setOrderCount(res.data.count))
      .catch(err => console.error("Error fetching orders count:", err));
  }, []);

  const navItems = [
    { label: "Overview", icon: <FaTachometerAlt />, path: "/admin/dashboard", color: "from-red-500 to-red-600" },
    { label: "Manage Designs", icon: <FaPalette />, path: "/admin/designs", color: "from-red-600 to-red-700" },
    { label: "Manage Users", icon: <FaUsers />, path: "/admin/users", color: "from-red-700 to-red-800" },
    { label: "Orders", icon: <FaShoppingCart />, path: "/admin/orders", color: "from-red-800 to-red-900" },
  ];

  const stats = [
    { 
      label: "Total Designs", 
      value: designCount, 
      icon: <FaPalette className="text-3xl" />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100"
    },
    { 
      label: "Total Users", 
      value: userCount, 
      icon: <FaUsers className="text-3xl" />,
      color: "from-red-600 to-red-700",
      bgColor: "bg-gradient-to-br from-red-100 to-red-200"
    },
    { 
      label: "Total Orders", 
      value: orderCount, 
      icon: <FaBox className="text-3xl" />,
      color: "from-red-700 to-red-800",
      bgColor: "bg-gradient-to-br from-red-200 to-red-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl w-80 flex flex-col justify-between transition-all duration-300 fixed lg:static z-20 h-full
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-8 flex flex-col justify-between h-full">
          <div>
            {/* Logo/Header */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-gray-400 text-sm mt-2">Management Dashboard</p>
            </div>
            
            {/* Navigation */}
            <nav className="flex flex-col gap-3">
              {navItems.map(({ label, icon, path, color }) => (
                <button
                  key={label}
                  onClick={() => { navigate(path); setSidebarOpen(false); }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl text-gray-300 hover:text-white transition-all duration-300 hover:bg-red-900/30 backdrop-blur-sm border border-transparent hover:border-red-500/30`}
                >
                  <span className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </span>
                  <span className="text-lg font-semibold">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* User & Logout */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-900/20 rounded-2xl border border-red-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-2xl text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user?.name || "Admin"}</p>
                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="group flex items-center gap-3 w-full p-4 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25"
            >
              <FaSignOutAlt className="group-hover:rotate-180 transition-transform duration-300" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-6 left-6 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl hover:scale-105 transition-transform duration-300"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-80 transition-all duration-300">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name || "Admin"}! 👋</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/admin/add-design")}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25 flex items-center gap-3"
              >
                <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                Add New Design
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                  <p className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Last updated: Just now</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "View Designs", icon: "🎨", path: "/designs", color: "from-red-500 to-red-600" },
              { label: "Manage Users", icon: "👥", path: "/admin/users", color: "from-red-600 to-red-700" },
              { label: "Process Orders", icon: "📦", path: "/admin/orders", color: "from-red-700 to-red-800" },
              { label: "Analytics", icon: "📊", path: "/admin/analytics", color: "from-red-800 to-red-900" }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`group p-6 rounded-2xl bg-gradient-to-r ${action.color} text-white text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
              >
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <h3 className="font-semibold text-lg">{action.label}</h3>
                <p className="text-white/80 text-sm mt-2">Click to manage</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📈</div>
            <p className="text-gray-600">Activity feed will appear here</p>
            <p className="text-gray-500 text-sm">Recent user actions and system events</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;