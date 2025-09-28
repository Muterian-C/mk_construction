// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('purchases');

  // Mock data for purchased designs
  const purchasedDesigns = [
    {
      id: 1,
      title: "Modern Villa Design",
      category: "Residential",
      purchasedDate: "2024-01-15",
      price: 299,
      status: "Downloaded",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      files: ["PDF", "CAD", "Images"],
      downloadsLeft: 5
    },
    {
      id: 2,
      title: "Commercial Office Space",
      category: "Commercial",
      purchasedDate: "2024-01-10",
      price: 499,
      status: "Available",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      files: ["PDF", "CAD", "3D Model"],
      downloadsLeft: 10
    },
    {
      id: 3,
      title: "Sustainable Eco-Home",
      category: "Residential",
      purchasedDate: "2024-01-05",
      price: 399,
      status: "Downloaded",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      files: ["PDF", "CAD", "Specifications"],
      downloadsLeft: 8
    }
  ];

  // Mock data for favorite designs
  const favoriteDesigns = [
    {
      id: 4,
      title: "Luxury Apartment Complex",
      category: "Residential",
      price: 599,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Retail Shopping Center",
      category: "Commercial",
      price: 799,
      image: "https://images.unsplash.com/photo-1503387762603-853d5b5c37d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Mock stats data
  const userStats = {
    totalPurchases: 3,
    totalSpent: 1197,
    downloadsUsed: 12,
    favoriteCategory: "Residential"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user?.name || user?.username || "Architect"}!
              </h1>
              <p className="text-red-100 text-lg">
                Manage your designs, track purchases, and access your architectural projects
              </p>
            </div>
            <Link
              to="/designs"
              className="mt-4 lg:mt-0 bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
            >
              Browse New Designs
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.totalPurchases}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800">${userStats.totalSpent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📥</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Downloads</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.downloadsUsed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Favorite Category</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.favoriteCategory}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-red-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'purchases', label: 'My Purchases', icon: '📦', count: purchasedDesigns.length },
                { id: 'favorites', label: 'Favorites', icon: '❤️', count: favoriteDesigns.length },
                { id: 'downloads', label: 'Download History', icon: '📥', count: 12 },
                { id: 'profile', label: 'Profile Settings', icon: '👤' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  {tab.label}
                  {tab.count && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Purchased Designs</h2>
                  <p className="text-gray-600">{purchasedDesigns.length} designs</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {purchasedDesigns.map((design) => (
                    <div key={design.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {design.category}
                        </div>
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          ${design.price}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{design.title}</h3>
                        
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                          <span>Purchased: {design.purchasedDate}</span>
                          <span className={`px-2 py-1 rounded-full ${
                            design.status === 'Downloaded' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {design.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Available formats:</p>
                          <div className="flex flex-wrap gap-2">
                            {design.files.map((file, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                                {file}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Downloads left: <strong>{design.downloadsLeft}</strong>
                          </span>
                          <div className="flex gap-2">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
                              Download
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition-colors">
                              View Online
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Favorite Designs</h2>
                  <p className="text-gray-600">{favoriteDesigns.length} designs saved</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favoriteDesigns.map((design) => (
                    <div key={design.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {design.category}
                        </div>
                        <button className="absolute top-4 right-4 bg-white text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors">
                          ❤️
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{design.title}</h3>
                        <p className="text-red-600 font-semibold text-lg mb-4">${design.price}</p>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                            Buy to Unlock
                          </button>
                          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Download History</h2>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-red-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Design</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Format</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          { design: "Modern Villa Design", date: "2024-01-15", format: "PDF", status: "Completed" },
                          { design: "Commercial Office Space", date: "2024-01-14", format: "CAD", status: "Completed" },
                          { design: "Sustainable Eco-Home", date: "2024-01-10", format: "Images", status: "Completed" },
                        ].map((download, index) => (
                          <tr key={index} className="hover:bg-red-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-800">{download.design}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{download.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{download.format}</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                {download.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                                Download Again
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-red-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            defaultValue={user?.name || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input 
                            type="email" 
                            defaultValue={user?.email || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input 
                            type="tel" 
                            placeholder="+254 700 000 000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment</label>
                          <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                            <option>M-Pesa</option>
                            <option>PayPal</option>
                            <option>Stripe (Credit Card)</option>
                          </select>
                        </div>
                      </div>
                      
                      <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                        Update Profile
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-red-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
                    
                    <div className="space-y-4">
                      <button className="w-full text-left p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                        Two-Factor Authentication
                      </button>
                      <button className="w-full text-left p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-red-100 mb-4">Our support team is here to assist you</p>
            <button className="bg-white text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-50 transition-colors">
              Contact Support
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Share Feedback</h3>
            <p className="text-blue-100 mb-4">Help us improve our service</p>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Give Feedback
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Refer a Friend</h3>
            <p className="text-green-100 mb-4">Earn credits when friends sign up</p>
            <button className="bg-white text-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              Share Referral
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}