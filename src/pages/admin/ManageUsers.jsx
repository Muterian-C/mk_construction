// src/pages/admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaBan, 
  FaCheck, 
  FaUserPlus,
  FaUserCheck,
  FaUserTimes,
  FaChartLine,
  FaEnvelope,
  FaCalendarAlt,
  FaShoppingCart,
  FaStar,
  FaCrown
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    role: "all",
    registrationDate: "all"
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    company: ""
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      const usersWithStats = await Promise.all(
        res.data.map(async (user) => {
          try {
            const statsRes = await axios.get(`/api/users/${user.id}/stats`);
            return {
              ...user,
              totalOrders: statsRes.data.total_orders,
              totalSpent: statsRes.data.total_spent,
              joinedDate: new Date(user.created_at).toLocaleDateString(),
              lastLogin: statsRes.data.last_login || "Never",
              designUploads: statsRes.data.design_uploads || 0,
            };
          } catch (error) {
            console.error("Error fetching stats for user:", user.id, error);
            return {
              ...user,
              totalOrders: 0,
              totalSpent: 0,
              joinedDate: new Date(user.created_at).toLocaleDateString(),
              lastLogin: "Never",
              designUploads: 0,
            };
          }
        })
      );
      setUsers(usersWithStats);
      setFilteredUsers(usersWithStats);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let results = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filters.status !== "all") {
      results = results.filter(user => 
        filters.status === "active" ? user.is_active : !user.is_active
      );
    }

    if (filters.role !== "all") {
      results = results.filter(user => user.role === filters.role);
    }

    if (filters.registrationDate === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      results = results.filter(user => new Date(user.created_at) > oneWeekAgo);
    }

    setFilteredUsers(results);
  }, [users, searchTerm, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create users");
      return;
    }

    try {
      await axios.post("/api/users", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ 
        name: "", email: "", password: "", role: "user", phone: "", company: "" 
      });
      fetchUsers();
      alert("User created successfully!");
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Error creating user: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user: " + (err.response?.data?.error || err.message));
    }
  };

const handleToggleStatus = async (user) => {
  try {
    console.log('🔄 Toggling status for user:', user.id, 'Current status:', user.is_active);
    
    const response = await axios.put(`/api/users/${user.id}`, {
      is_active: !user.is_active
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log('✅ Status toggle response:', response.data);
    alert(`User ${!user.is_active ? 'activated' : 'deactivated'} successfully!`);
    fetchUsers();
    
  } catch (err) {
    console.error("❌ Error toggling user status:", err);
    
    // More detailed error handling
    let errorMessage = "Unknown error occurred";
    
    if (err.response) {
      // Server responded with error status
      errorMessage = err.response.data?.error || 
                    `Server error: ${err.response.status} ${err.response.statusText}`;
    } else if (err.request) {
      // Request made but no response received
      errorMessage = "No response from server. Check your connection.";
    } else {
      // Something else happened
      errorMessage = err.message;
    }
    
    alert(`Error updating user status: ${errorMessage}`);
  }
};
const handleUpdateRole = async (user) => {
  const newRole = prompt("Enter 'admin' or 'user':", user.role);
  if (newRole && (newRole.toLowerCase() === "admin" || newRole.toLowerCase() === "user")) {
    try {
      await axios.put(`/api/users/${user.id}`, {
        role: newRole.toLowerCase(),
        is_active: user.is_active
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert(`User role updated to ${newRole.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Error updating role: " + (err.response?.data?.error || err.message));
    }
  } else if (newRole) {
    alert("Please enter either 'admin' or 'user'");
  }
};

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const sendWelcomeEmail = async (user) => {
    try {
      await axios.post(`/api/users/${user.id}/welcome-email`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Welcome email sent successfully!");
    } catch (err) {
      console.error("Error sending welcome email:", err);
      alert("Error sending welcome email: " + (err.response?.data?.error || err.message));
    }
  };

  const getTopSpender = () => {
    if (users.length === 0) return { name: "None", spent: 0 };
    const topSpender = users.reduce((prev, current) => 
      ((prev.totalSpent || 0) > (current.totalSpent || 0)) ? prev : current
    );
    return { name: topSpender.name, spent: topSpender.totalSpent || 0 };
  };

  const getMostActiveUser = () => {
    if (users.length === 0) return { name: "None", orders: 0 };
    const mostActive = users.reduce((prev, current) => 
      ((prev.totalOrders || 0) > (current.totalOrders || 0)) ? prev : current
    );
    return { name: mostActive.name, orders: mostActive.totalOrders || 0 };
  };

  const calculateTotalRevenue = () => {
    return users.reduce((total, user) => total + (user.totalSpent || 0), 0);
  };

  const getNewUsersThisWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return users.filter(user => new Date(user.created_at) > oneWeekAgo).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-red-800 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Manage <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Users</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            Manage user accounts, track activity, and maintain platform security.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(249 250 251)"></path>
          </svg>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-4 items-center">
              <FaFilter className="text-gray-600" />
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Role Filter */}
            <select 
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            {/* Registration Date Filter */}
            <select 
              value={filters.registrationDate}
              onChange={(e) => setFilters(prev => ({ ...prev, registrationDate: e.target.value }))}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="all">All Time</option>
              <option value="recent">Last 7 Days</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 space-y-8">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Users" 
              value={users.length} 
              icon="👥" 
              color="blue" 
            />
            <StatCard 
              title="Top Spender" 
              value={getTopSpender().name} 
              icon="💰" 
              color="green" 
              subtitle={`KES ${getTopSpender().spent.toLocaleString()}`}
            />
            <StatCard 
              title="Most Active" 
              value={getMostActiveUser().name} 
              icon="🔥" 
              color="red" 
              subtitle={`${getMostActiveUser().orders} orders`}
            />
            <StatCard 
              title="New This Week" 
              value={getNewUsersThisWeek()} 
              icon="🆕" 
              color="purple" 
              subtitle="users joined"
            />
          </div>

          {/* Create User Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaUserPlus className="text-red-600" />
              Create New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                />
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company (Optional)"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25"
              >
                Create User
              </button>
            </form>
          </div>

          {/* Users Table */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
              <p className="text-gray-600">
                Showing <span className="font-semibold text-red-600">{filteredUsers.length}</span> users
              </p>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No users found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Orders</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Spent</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <UserRow
                          key={user.id}
                          user={user}
                          onToggleStatus={handleToggleStatus}
                          onUpdateRole={handleUpdateRole}
                          onDelete={handleDelete}
                          onViewDetails={handleViewDetails}
                          onSendWelcomeEmail={sendWelcomeEmail}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isUserDetailsOpen}
        onClose={() => setIsUserDetailsOpen(false)}
      />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`bg-gradient-to-r ${colorClasses[color]} text-white p-3 rounded-2xl`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

// User Row Component
const UserRow = ({ user, onToggleStatus, onUpdateRole, onDelete, onViewDetails, onSendWelcomeEmail }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-200">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          {user.company && <div className="text-xs text-gray-500">{user.company}</div>}
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
        user.role === 'admin' 
          ? 'bg-purple-100 text-purple-800' 
          : 'bg-blue-100 text-blue-800'
      }`}>
        {user.role === 'admin' ? <FaCrown /> : <FaUserCheck />}
        {/* CHANGED THIS LINE: Show "Customer" instead of "User" */}
        {user.role === 'admin' ? 'Admin' : 'Customer'}
      </span>
    </td>
    <td className="px-6 py-4">
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
        user.is_active 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {user.is_active ? <FaCheck /> : <FaBan />}
        {user.is_active ? 'Active' : 'Inactive'}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-gray-400" />
        <span className="font-semibold">{user.totalOrders || 0}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="font-semibold text-green-600">
        KES {(user.totalSpent || 0).toLocaleString()}
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FaCalendarAlt />
        {user.joinedDate}
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(user)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <FaChartLine />
        </button>
        <button
          onClick={() => onToggleStatus(user)}
          className={`p-2 rounded-lg transition-colors ${
            user.is_active 
              ? 'text-yellow-600 hover:bg-yellow-50' 
              : 'text-green-600 hover:bg-green-50'
          }`}
          title={user.is_active ? "Deactivate" : "Activate"}
        >
          {user.is_active ? <FaBan /> : <FaCheck />}
        </button>
        <button
          onClick={() => onUpdateRole(user)}
          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          title="Change Role"
        >
          <FaUserCheck />
        </button>
        <button
          onClick={() => onSendWelcomeEmail(user)}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Send Welcome Email"
        >
          <FaEnvelope />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete User"
        >
          <FaTrash />
        </button>
      </div>
    </td>
  </tr>
);

// User Details Modal
const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-gray-900 to-red-800 text-white p-6">
          <h3 className="text-2xl font-bold">User Details: {user.name}</h3>
          <button 
            onClick={onClose}
            className="absolute top-4 right-6 text-white hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Personal Information</label>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                  <p><strong>Company:</strong> {user.company || 'Not provided'}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Account Status</label>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <p><strong>Joined:</strong> {user.joinedDate}</p>
                  <p><strong>Last Login:</strong> {user.lastLogin}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Activity Metrics</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.totalOrders || 0}</div>
                    <div className="text-sm text-blue-800">Total Orders</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">KES {(user.totalSpent || 0).toLocaleString()}</div>
                    <div className="text-sm text-green-800">Total Spent</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.designUploads || 0}</div>
                    <div className="text-sm text-purple-800">Designs Uploaded</div>
                  </div>
                  <div className="bg-yellow-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{user.averageRating || 'N/A'}</div>
                    <div className="text-sm text-yellow-800">Avg Rating</div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Recent Activity</label>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-600">Activity timeline would appear here...</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;