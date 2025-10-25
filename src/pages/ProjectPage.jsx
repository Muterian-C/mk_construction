import React, { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaWarehouse,
  FaFilter,
  FaSearch,
  FaTh,
  FaList,
  FaDownload,
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaShoppingCart,
  FaEye,
  FaCheck,
  FaAward,
  FaHeart,
  FaMapMarkerAlt
} from "react-icons/fa";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const categories = [
    { id: "all", name: "All Designs", icon: <FaTh />, count: 24 },
    { id: "residential", name: "Residential", icon: <FaHome />, count: 15 },
    { id: "commercial", name: "Commercial", icon: <FaBuilding />, count: 6 },
    { id: "specialty", name: "Specialty", icon: <FaWarehouse />, count: 3 }
  ];

  const featuredDesigns = [
    {
      id: 1,
      title: "Modern Villa Paradise",
      category: "residential",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 15000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      rating: 4.9,
      downloads: 342,
      featured: true,
      popular: true,
      description: "Luxurious 5-bedroom villa with contemporary design and open-plan living"
    },
    {
      id: 2,
      title: "Elegant Townhouse",
      category: "residential",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 8500,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2100,
      rating: 4.8,
      downloads: 589,
      featured: true,
      popular: true,
      description: "Perfect family home with efficient space utilization and modern amenities"
    },
    {
      id: 3,
      title: "Sleek Office Complex",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 25000,
      bedrooms: null,
      bathrooms: null,
      sqft: 8500,
      rating: 4.7,
      downloads: 156,
      featured: true,
      popular: false,
      description: "Multi-story office building designed for productivity and professional appeal"
    },
    {
      id: 4,
      title: "Cozy Bungalow",
      category: "residential",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 6500,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      rating: 4.9,
      downloads: 721,
      featured: false,
      popular: true,
      description: "Affordable and charming single-story home perfect for small families"
    },
    {
      id: 5,
      title: "Luxury Penthouse Design",
      category: "residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 18500,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3800,
      rating: 4.8,
      downloads: 234,
      featured: true,
      popular: false,
      description: "High-end apartment design with panoramic views and premium finishes"
    },
    {
      id: 6,
      title: "Retail Shopping Center",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 32000,
      bedrooms: null,
      bathrooms: null,
      sqft: 12000,
      rating: 4.6,
      downloads: 89,
      featured: false,
      popular: false,
      description: "Modern retail space with flexible layout for multiple tenants"
    },
    {
      id: 7,
      title: "Contemporary Duplex",
      category: "residential",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 11000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      rating: 4.7,
      downloads: 445,
      featured: false,
      popular: true,
      description: "Two-story home with separate living spaces and shared outdoor area"
    },
    {
      id: 8,
      title: "Industrial Warehouse",
      category: "specialty",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 22000,
      bedrooms: null,
      bathrooms: null,
      sqft: 15000,
      rating: 4.5,
      downloads: 67,
      featured: false,
      popular: false,
      description: "Large-scale storage facility with loading docks and office space"
    },
    {
      id: 9,
      title: "Minimalist Studio Home",
      category: "residential",
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 4500,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 850,
      rating: 4.8,
      downloads: 892,
      featured: false,
      popular: true,
      description: "Compact yet stylish design perfect for singles or starter homes"
    }
  ];

  const builtProjects = [
    {
      id: 1,
      title: "Karen Residence - Nairobi",
      location: "Karen, Nairobi",
      designUsed: "Modern Villa Paradise",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: 2024
    },
    {
      id: 2,
      title: "Westlands Office Tower",
      location: "Westlands, Nairobi",
      designUsed: "Sleek Office Complex",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: 2023
    },
    {
      id: 3,
      title: "Runda Family Home",
      location: "Runda, Nairobi",
      designUsed: "Elegant Townhouse",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: 2024
    }
  ];

  const stats = [
    { number: "500+", label: "Design Templates", icon: <FaHome /> },
    { number: "10,000+", label: "Happy Customers", icon: <FaCheck /> },
    { number: "850+", label: "Built Projects", icon: <FaAward /> },
    { number: "4.8/5", label: "Average Rating", icon: <FaStar /> }
  ];

  const filteredDesigns = featuredDesigns.filter(design => {
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory;
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === "all" ||
      (priceRange === "low" && design.price < 10000) ||
      (priceRange === "mid" && design.price >= 10000 && design.price < 20000) ||
      (priceRange === "high" && design.price >= 20000);

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-red-900 to-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-6 py-3 rounded-full text-red-200 mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
            500+ Professional Designs Available
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-light mb-8 text-gray-300 max-w-4xl mx-auto">
            Explore Our Premium Design Collection & Real-World Success Stories
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="rgb(254 242 242)"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="text-3xl text-red-600 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Designs Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Browse Our Collection
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Featured Design Portfolio
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium architectural designs ready for instant purchase and download
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-3">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under KES 10,000</option>
                  <option value="mid">KES 10,000 - 20,000</option>
                  <option value="high">Above KES 20,000</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="md:col-span-2 flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 ${viewMode === "grid"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 ${viewMode === "list"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "all" || priceRange !== "all" || searchTerm) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-red-900">×</button>
                  </span>
                )}
                {priceRange !== "all" && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {priceRange === "low" ? "Under 10K" : priceRange === "mid" ? "10K-20K" : "Above 20K"}
                    <button onClick={() => setPriceRange("all")} className="ml-2 hover:text-blue-900">×</button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-green-900">×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Design Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 ${viewMode === "list" ? "flex" : ""
                  }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "h-64"}`}>
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Watermark Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white/30 text-2xl font-bold transform -rotate-12">
                      MK CONSTRUCTION
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {design.featured && (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaStar className="text-xs" /> Featured
                      </span>
                    )}
                    {design.popular && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaHeart className="text-xs" /> Popular
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
                      <FaEye className="text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === "list" ? "w-2/3 flex flex-col justify-between" : ""}`}>
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                        {design.title}
                      </h3>
                      <div className="flex items-center text-yellow-500 text-sm ml-2">
                        <FaStar className="mr-1" />
                        {design.rating}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {design.description}
                    </p>

                    {/* Specs */}
                    {design.bedrooms && (
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaBed className="mr-2 text-red-500" />
                          {design.bedrooms} Beds
                        </div>
                        <div className="flex items-center">
                          <FaBath className="mr-2 text-blue-500" />
                          {design.bathrooms} Baths
                        </div>
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-2 text-green-500" />
                          {design.sqft.toLocaleString()} sqft
                        </div>
                      </div>
                    )}

                    {!design.bedrooms && (
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-2 text-green-500" />
                          {design.sqft.toLocaleString()} sqft
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <FaDownload className="mr-1" /> {design.downloads} downloads
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full capitalize">
                        {design.category}
                      </span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-black text-gray-800">
                        {formatPrice(design.price)}
                      </div>
                      <div className="text-xs text-gray-500">One-time payment</div>
                    </div>
                    <button className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg">
                      <FaShoppingCart />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDesigns.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No designs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange("all");
                  setSearchTerm("");
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Built Projects Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Real-World Success
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Projects Built With Our Designs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our designs transform into stunning real-world structures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {builtProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs bg-green-600 inline-block px-3 py-1 rounded-full mb-2">
                      Built {project.year}
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    {project.location}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-xs text-blue-600 font-semibold mb-1">Design Used:</div>
                    <div className="text-sm font-bold text-gray-800">{project.designUsed}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Browse our full collection or contact us for custom design services
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/designs">
                  <button className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                    View All Designs
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                    Contact for Custom Design
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </Link>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;