// src/pages/admin/ManageOrders.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaDownload, 
  FaReceipt, FaUser, FaPalette, FaMoneyBillWave, FaShoppingCart,
  FaChartLine, FaFilePdf, FaMobileAlt, FaCreditCard, FaPaypal,
  FaCalendarAlt, FaSync, FaPrint
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    paymentMethod: "all",
    dateRange: "all"
  });

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders");
      const ordersWithDetails = await Promise.all(
        res.data.map(async (order) => {
          try {
            // Fetch customer details
            const customerRes = await axios.get(`/api/users/${order.user_id}`);
            // Fetch design details
            const designRes = await axios.get(`/api/designs/${order.design_id}`);
            
            return {
              ...order,
              customer: customerRes.data,
              design: designRes.data,
              formattedDate: new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              status: getOrderStatus(order),
              paymentIcon: getPaymentIcon(order.payment_method),
              statusColor: getStatusColor(getOrderStatus(order))
            };
          } catch (error) {
            console.error("Error fetching order details:", order.id, error);
            return {
              ...order,
              customer: { name: "Unknown", email: "Unknown" },
              design: { title: "Unknown Design", price: 0 },
              formattedDate: new Date(order.created_at).toLocaleDateString(),
              status: "Unknown",
              paymentIcon: <FaMoneyBillWave />,
              statusColor: "gray"
            };
          }
        })
      );
      setOrders(ordersWithDetails);
      setFilteredOrders(ordersWithDetails);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatus = (order) => {
    if (order.payment_status === 'completed' && order.download_count > 0) return 'Completed';
    if (order.payment_status === 'completed') return 'Paid';
    if (order.payment_status === 'pending') return 'Pending';
    if (order.payment_status === 'failed') return 'Failed';
    return 'Unknown';
  };

  const getPaymentIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'mpesa': return <FaMobileAlt className="text-green-500" />;
      case 'paypal': return <FaPaypal className="text-blue-500" />;
      case 'stripe': return <FaCreditCard className="text-purple-500" />;
      default: return <FaMoneyBillWave className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Paid': return 'blue';
      case 'Pending': return 'yellow';
      case 'Failed': return 'red';
      default: return 'gray';
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and filters
  useEffect(() => {
    let results = orders.filter(order => 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    );

    if (filters.status !== "all") {
      results = results.filter(order => order.status === filters.status);
    }

    if (filters.paymentMethod !== "all") {
      results = results.filter(order => order.payment_method === filters.paymentMethod);
    }

    if (filters.dateRange === "today") {
      const today = new Date();
      results = results.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.toDateString() === today.toDateString();
      });
    } else if (filters.dateRange === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      results = results.filter(order => new Date(order.created_at) > oneWeekAgo);
    }

    setFilteredOrders(results);
  }, [orders, searchTerm, filters]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleMarkAsCompleted = async (order) => {
    try {
      await axios.put(`/api/orders/${order.id}`, {
        status: 'completed'
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
      alert("Order marked as completed!");
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Error updating order: " + (err.response?.data?.error || err.message));
    }
  };

  const handleResendDownload = async (order) => {
    try {
      await axios.post(`/api/orders/${order.id}/resend-download`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Download link resent to customer!");
    } catch (err) {
      console.error("Error resending download:", err);
      alert("Error resending download: " + (err.response?.data?.error || err.message));
    }
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'Completed' || order.status === 'Paid')
      .reduce((total, order) => total + (order.amount || order.design.price || 0), 0);
  };

  const getPendingOrdersCount = () => {
    return orders.filter(order => order.status === 'Pending').length;
  };

  const getPaymentMethodStats = () => {
    const stats = {};
    orders.forEach(order => {
      const method = order.payment_method || 'unknown';
      stats[method] = (stats[method] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading orders...</p>
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
            Manage <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Orders</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            Track purchases, manage order fulfillment, and monitor sales performance.
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
                placeholder="Search orders by customer, design, or order ID..."
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
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <select 
              value={filters.paymentMethod}
              onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="all">All Payments</option>
              <option value="mpesa">M-Pesa</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>

            {/* Date Range Filter */}
            <select 
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
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
              title="Total Orders" 
              value={orders.length} 
              icon="📦" 
              color="blue" 
            />
            <StatCard 
              title="Total Revenue" 
              value={`KES ${getTotalRevenue().toLocaleString()}`} 
              icon="💰" 
              color="green" 
            />
            <StatCard 
              title="Pending Orders" 
              value={getPendingOrdersCount()} 
              icon="⏳" 
              color="yellow" 
            />
            <StatCard 
              title="Success Rate" 
              value={`${((orders.filter(o => o.status === 'Completed').length / orders.length) * 100 || 0).toFixed(1)}%`} 
              icon="📊" 
              color="purple" 
            />
          </div>

          {/* Payment Method Breakdown */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(getPaymentMethodStats()).map(([method, count]) => (
                <div key={method} className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="text-3xl mb-2">
                    {getPaymentIcon({ payment_method: method })}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{method}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
              <p className="text-gray-600">
                Showing <span className="font-semibold text-red-600">{filteredOrders.length}</span> orders
              </p>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Design</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <OrderRow
                          key={order.id}
                          order={order}
                          onViewDetails={handleViewDetails}
                          onMarkCompleted={handleMarkAsCompleted}
                          onResendDownload={handleResendDownload}
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

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        onMarkCompleted={handleMarkAsCompleted}
        onResendDownload={handleResendDownload}
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
    yellow: "from-yellow-500 to-yellow-600",
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

// Order Row Component
const OrderRow = ({ order, onViewDetails, onMarkCompleted, onResendDownload }) => {
  const statusColors = {
    Completed: 'bg-green-100 text-green-800',
    Paid: 'bg-blue-100 text-blue-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
    Unknown: 'bg-gray-100 text-gray-800'
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="font-mono font-semibold text-gray-900">#{order.id}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {order.customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{order.customer.name}</div>
            <div className="text-sm text-gray-600">{order.customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900 line-clamp-1">{order.design.title}</div>
        <div className="text-sm text-gray-600 capitalize">{order.design.category}</div>
      </td>
      <td className="px-6 py-4">
        <div className="font-bold text-green-600">
          KES {(order.amount || order.design.price || 0).toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {order.paymentIcon}
          <span className="capitalize">{order.payment_method}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
          {order.status === 'Completed' && <FaCheck />}
          {order.status === 'Paid' && <FaMoneyBillWave />}
          {order.status === 'Pending' && <FaSync />}
          {order.status === 'Failed' && <FaTimes />}
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt />
          {order.formattedDate}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(order)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <FaEye />
          </button>
          {(order.status === 'Paid' || order.status === 'Completed') && (
            <button
              onClick={() => onResendDownload(order)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Resend Download"
            >
              <FaDownload />
            </button>
          )}
          {order.status === 'Paid' && (
            <button
              onClick={() => onMarkCompleted(order)}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Mark as Completed"
            >
              <FaCheck />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

// Order Details Modal
const OrderDetailsModal = ({ order, isOpen, onClose, onMarkCompleted, onResendDownload }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-gray-900 to-red-800 text-white p-6">
          <h3 className="text-2xl font-bold">Order Details: #{order.id}</h3>
          <button 
            onClick={onClose}
            className="absolute top-4 right-6 text-white hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Customer Information */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-red-600" />
                  Customer Information
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{order.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{order.customer.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Company:</span>
                    <span>{order.customer.company || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaReceipt className="text-red-600" />
                  Order Information
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Order Date:</span>
                    <span>{order.formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Paid' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Downloads:</span>
                    <span>{order.download_count || 0} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Download:</span>
                    <span>{order.last_download_at ? new Date(order.last_download_at).toLocaleDateString() : 'Never'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Design & Payment Information */}
            <div className="space-y-6">
              {/* Design Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaPalette className="text-red-600" />
                  Design Information
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Design:</span>
                    <span className="text-right font-semibold">{order.design.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span className="capitalize">{order.design.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File Type:</span>
                    <span>{order.design.file_type || 'PDF/CAD'}</span>
                  </div>
                  {order.design.preview_url && (
                    <div className="mt-3">
                      <img 
                        src={order.design.preview_url} 
                        alt={order.design.title}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMoneyBillWave className="text-red-600" />
                  Payment Information
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Amount:</span>
                    <span className="font-bold text-green-600 text-lg">
                      KES {(order.amount || order.design.price || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Method:</span>
                    <span className="flex items-center gap-2 capitalize">
                      {order.paymentIcon}
                      {order.payment_method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Transaction ID:</span>
                    <span className="font-mono text-sm">{order.transaction_id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Status:</span>
                    <span className="capitalize">{order.payment_status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-end border-t pt-6">
            <button 
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Close
            </button>
            <button 
              onClick={() => {
                window.print();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <FaPrint />
              Print Receipt
            </button>
            {(order.status === 'Paid' || order.status === 'Completed') && (
              <button 
                onClick={() => onResendDownload(order)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload />
                Resend Download
              </button>
            )}
            {order.status === 'Paid' && (
              <button 
                onClick={() => onMarkCompleted(order)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <FaCheck />
                Mark Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;