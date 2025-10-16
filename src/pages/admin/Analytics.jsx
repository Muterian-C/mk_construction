// src/pages/admin/Analytics.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { 
  FaChartLine, FaChartBar, FaChartPie, FaUsers, FaShoppingCart, 
  FaPalette, FaMoneyBillWave, FaCalendar, FaDownload, FaArrowUp, 
  FaArrowDown, FaEye, FaStar, FaMobileAlt, FaPaypal, FaCreditCard,
  FaFilter, FaFileExport
} from "react-icons/fa";

const Analytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30days"); // 7days, 30days, 90days, 1year
  const [activeChart, setActiveChart] = useState("revenue");

  // Mock analytics data - replace with actual API calls
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // In a real app, you'd make API calls like:
      // const res = await axios.get(`/api/analytics?range=${timeRange}`);
      
      // Mock data for demonstration
      setTimeout(() => {
        setAnalytics({
          overview: {
            totalRevenue: 1250000,
            totalOrders: 342,
            totalUsers: 189,
            totalDesigns: 67,
            revenueGrowth: 12.5,
            ordersGrowth: 8.3,
            usersGrowth: 15.2,
            designsGrowth: 5.7
          },
          revenueData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [85000, 92000, 78000, 110000, 125000, 140000, 135000, 150000, 145000, 160000, 155000, 170000]
          },
          ordersData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [25, 28, 22, 35, 42, 45, 38, 50, 47, 52, 48, 55]
          },
          userGrowth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [45, 52, 48, 65, 72, 78, 85, 92, 98, 112, 125, 145]
          },
          paymentMethods: [
            { method: 'M-Pesa', count: 215, percentage: 63, color: 'from-green-500 to-green-600' },
            { method: 'PayPal', count: 78, percentage: 23, color: 'from-blue-500 to-blue-600' },
            { method: 'Stripe', count: 49, percentage: 14, color: 'from-purple-500 to-purple-600' }
          ],
          topDesigns: [
            { id: 1, title: 'Modern Family House', sales: 45, revenue: 675000, rating: 4.8 },
            { id: 2, title: 'Commercial Office Complex', sales: 32, revenue: 480000, rating: 4.9 },
            { id: 3, title: 'Luxury Apartment Block', sales: 28, revenue: 420000, rating: 4.7 },
            { id: 4, title: 'Beachfront Villa', sales: 25, revenue: 375000, rating: 4.6 },
            { id: 5, title: 'Minimalist Bungalow', sales: 22, revenue: 330000, rating: 4.5 }
          ],
          userActivity: {
            newUsers: 45,
            returningUsers: 144,
            downloadCount: 389,
            averageSession: '12m 34s'
          },
          conversionRates: {
            visitorToSignup: 8.5,
            signupToPurchase: 22.3,
            overallConversion: 1.9
          }
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-red-800 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Business <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Analytics</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
                Track performance, monitor growth, and make data-driven decisions.
              </p>
            </div>
            
            {/* Time Range Filter */}
            <div className="flex gap-4 items-center bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <FaFilter className="text-gray-300" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-white border-none focus:ring-0"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(249 250 251)"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 space-y-8">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Total Revenue" 
              value={`KES ${analytics.overview.totalRevenue.toLocaleString()}`}
              icon={<FaMoneyBillWave className="text-2xl" />}
              growth={analytics.overview.revenueGrowth}
              color="from-green-500 to-green-600"
            />
            <MetricCard 
              title="Total Orders" 
              value={analytics.overview.totalOrders}
              icon={<FaShoppingCart className="text-2xl" />}
              growth={analytics.overview.ordersGrowth}
              color="from-blue-500 to-blue-600"
            />
            <MetricCard 
              title="Total Users" 
              value={analytics.overview.totalUsers}
              icon={<FaUsers className="text-2xl" />}
              growth={analytics.overview.usersGrowth}
              color="from-purple-500 to-purple-600"
            />
            <MetricCard 
              title="Total Designs" 
              value={analytics.overview.totalDesigns}
              icon={<FaPalette className="text-2xl" />}
              growth={analytics.overview.designsGrowth}
              color="from-red-500 to-red-600"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaChartLine className="text-red-600" />
                  Revenue Overview
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-2xl bg-red-100 text-red-600 font-semibold text-sm">
                    Revenue
                  </button>
                  <button className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm">
                    Orders
                  </button>
                </div>
              </div>
              <RevenueChart data={analytics.revenueData} />
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaChartPie className="text-red-600" />
                Payment Methods
              </h2>
              <div className="space-y-4">
                {analytics.paymentMethods.map((payment, index) => (
                  <div key={payment.method} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${payment.color} flex items-center justify-center text-white`}>
                        {payment.method === 'M-Pesa' && <FaMobileAlt />}
                        {payment.method === 'PayPal' && <FaPaypal />}
                        {payment.method === 'Stripe' && <FaCreditCard />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{payment.method}</div>
                        <div className="text-sm text-gray-600">{payment.count} orders</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800 text-lg">{payment.percentage}%</div>
                      <div className="text-sm text-gray-600">of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Activity & Conversion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Activity */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUsers className="text-red-600" />
                User Activity
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600">{analytics.userActivity.newUsers}</div>
                  <div className="text-sm text-green-800">New Users</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600">{analytics.userActivity.returningUsers}</div>
                  <div className="text-sm text-blue-800">Returning Users</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600">{analytics.userActivity.downloadCount}</div>
                  <div className="text-sm text-purple-800">Total Downloads</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                  <div className="text-3xl font-bold text-yellow-600">{analytics.userActivity.averageSession}</div>
                  <div className="text-sm text-yellow-800">Avg. Session</div>
                </div>
              </div>
            </div>

            {/* Conversion Rates */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaChartBar className="text-red-600" />
                Conversion Rates
              </h2>
              <div className="space-y-6">
                <ConversionBar 
                  label="Visitor to Signup"
                  percentage={analytics.conversionRates.visitorToSignup}
                  color="from-blue-500 to-blue-600"
                />
                <ConversionBar 
                  label="Signup to Purchase"
                  percentage={analytics.conversionRates.signupToPurchase}
                  color="from-green-500 to-green-600"
                />
                <ConversionBar 
                  label="Overall Conversion"
                  percentage={analytics.conversionRates.overallConversion}
                  color="from-purple-500 to-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Top Performing Designs */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaStar className="text-red-600" />
                Top Performing Designs
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold transition-all duration-300">
                <FaFileExport />
                Export Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Design</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sales</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics.topDesigns.map((design) => (
                    <tr key={design.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{design.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{design.sales}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-green-600">KES {design.revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{design.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" 
                            style={{ width: `${(design.sales / analytics.topDesigns[0].sales) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, growth, color }) => (
  <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl bg-gradient-to-r ${color} text-white`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold ${
        growth >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        {Math.abs(growth)}%
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// Revenue Chart Component (Simplified - in real app use Chart.js or similar)
const RevenueChart = ({ data }) => (
  <div className="relative h-80">
    <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
      {data.data.map((value, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-8 bg-gradient-to-t from-red-500 to-red-600 rounded-t-lg transition-all duration-500 hover:from-red-400 hover:to-red-500"
            style={{ height: `${(value / Math.max(...data.data)) * 200}px` }}
          ></div>
          <div className="text-sm text-gray-600 mt-2">{data.labels[index]}</div>
        </div>
      ))}
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
  </div>
);

// Conversion Bar Component
const ConversionBar = ({ label, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className={`h-3 rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default Analytics;