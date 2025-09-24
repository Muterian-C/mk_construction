// src/pages/Gallery.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaEye } from "react-icons/fa";

export default function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "All Designs", "Residential", "Commercial", "Apartments", 
    "Offices", "Hotels", "Educational", "Religious"
  ];

  useEffect(() => {
    api.get("/api/designs")
      .then((res) => {
        setDesigns(res.data);
        setFilteredDesigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching designs:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = designs.filter(design => 
      design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "all") {
      results = results.filter(design => design.category === selectedCategory);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        results.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "newest":
      default:
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredDesigns(results);
  }, [designs, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading premium designs...</p>
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
            Architectural <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            Discover our curated collection of premium architectural designs. 
            Preview watermarked samples and unlock full designs with secure payment.
          </p>
        </div>

        {/* Wave Divider */}
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
                placeholder="Search designs by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-4 items-center">
              <FaFilter className="text-gray-600" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No designs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-red-600">{filteredDesigns.length}</span> designs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// Design Card Component
const DesignCard = ({ design }) => (
  <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
    {/* Design Image with Watermark Overlay */}
    <div className="relative overflow-hidden">
      <img
        src={design.preview_url}
        alt={design.title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Watermark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-2 opacity-80">🔒</div>
          <p className="font-bold text-lg mb-1">PREVIEW</p>
          <p className="text-sm opacity-90">Watermarked Sample</p>
        </div>
      </div>

      {/* Design Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {design.isFeatured && (
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Featured
          </span>
        )}
        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {design.category}
        </span>
      </div>

      {/* View Count */}
      <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
        <FaEye className="inline mr-1" /> {design.viewCount || 0}
      </div>

      {/* Price Tag */}
      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
        KES {design.price.toLocaleString()}
      </div>
    </div>

    {/* Design Info */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
        {design.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {design.description}
      </p>

      {/* Design Features */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          {design.rating || "New"}
        </span>
        <span>•</span>
        <span>{design.downloads || 0} downloads</span>
        <span>•</span>
        <span>{design.fileType}</span>
      </div>

      {/* Action Buttons */}
      <Link
        to={`/designs/${design.id}`}
        className="group/btn w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25 flex items-center justify-center gap-2"
      >
        <FaSearch />
        View Details
        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
      </Link>
    </div>
  </div>
);