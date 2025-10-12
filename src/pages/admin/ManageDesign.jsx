// src/pages/admin/ManageDesigns.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSearch, FaFilter, FaStar, FaEye, FaEdit, FaTrash, FaChartBar, 
  FaTag, FaUpload, FaImages, FaVideo, FaFile, FaExternalLinkAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageDesigns = () => {
  const { token, user } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000000000 },
    salesPerformance: "all"
  });

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    file_type: "PDF/CAD",
    preview_files: null,
    full_files: null,
    video_file: null,
  });

  const designCategories = [
    "Residential", "Commercial", "Apartments", "Offices", 
    "Hotels", "Educational", "Religious"
  ];

  // Fetch all designs
  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/get_designs");
      setDesigns(res.data);
      setFilteredDesigns(res.data);
    } catch (err) {
      console.error("Error fetching designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Filter designs based on search and filters
  useEffect(() => {
    let results = designs.filter(design => 
      design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.category) {
      results = results.filter(design => design.category === filters.category);
    }

    if (filters.priceRange) {
      results = results.filter(design => 
        design.price >= filters.priceRange.min && 
        design.price <= filters.priceRange.max
      );
    }

    if (filters.salesPerformance === "high") {
      results = results.filter(design => (design.salesCount || 0) >= 10);
    } else if (filters.salesPerformance === "low") {
      results = results.filter(design => (design.salesCount || 0) <= 5);
    }

    setFilteredDesigns(results);
  }, [designs, searchTerm, filters]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'preview_files' || name === 'full_files') {
      setForm((prev) => ({
        ...prev,
        [name]: files ? Array.from(files) : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to upload designs");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("file_type", form.file_type);
      formData.append("is_featured", "0");
      
      if (form.preview_files) {
        form.preview_files.forEach(file => {
          formData.append("preview_files[]", file);
        });
      }
      
      if (form.full_files) {
        form.full_files.forEach(file => {
          formData.append("full_files[]", file);
        });
      }
      
      if (form.video_file) {
        formData.append("video_file", form.video_file);
      }

      await axios.post("/api/adddesigns", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ 
        title: "", 
        category: "", 
        description: "", 
        price: "", 
        file_type: "PDF/CAD",
        preview_files: null, 
        full_files: null,
        video_file: null
      });
      
      fetchDesigns();
      alert("Design uploaded successfully!");
    } catch (err) {
      console.error("Error uploading design:", err);
      alert("Error uploading design: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;
    try {
      await axios.delete(`/api/designs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDesigns();
    } catch (err) {
      console.error("Error deleting design:", err);
      alert("Error deleting design: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEditDesign = (design) => {
    navigate(`/admin/edit-design/${design.id}`);
  };

  // NEW: Navigate to admin design details
  const handleViewDetails = (design) => {
    navigate(`/admin/designs/${design.id}`);
  };

  const handleToggleFeatured = async (design) => {
    try {
      await axios.put(`/api/designs/${design.id}`, {
        is_featured: design.is_featured ? 0 : 1
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDesigns();
    } catch (err) {
      console.error("Error toggling featured status:", err);
      alert("Error updating featured status: " + (err.response?.data?.error || err.message));
    }
  };

  const handleUpdatePrice = async (design) => {
    const newPrice = prompt("Enter new price:", design.price);
    if (newPrice) {
      try {
        await axios.put(`/api/designs/${design.id}`, {
          price: parseFloat(newPrice)
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDesigns();
      } catch (err) {
        console.error("Error updating price:", err);
        alert("Error updating price: " + (err.response?.data?.error || err.message));
      }
    }
  };

  const getBestSeller = () => {
    if (designs.length === 0) return { title: "None", sales: 0 };
    const bestSeller = designs.reduce((prev, current) => 
      ((prev.salesCount || 0) > (current.salesCount || 0)) ? prev : current
    );
    return { title: bestSeller.title, sales: bestSeller.salesCount || 0 };
  };

  const calculateTotalRevenue = () => {
    return designs.reduce((total, design) => total + (design.totalRevenue || 0), 0);
  };

  const calculateAverageRating = () => {
    if (designs.length === 0) return 0;
    const designsWithRatings = designs.filter(d => d.averageRating > 0);
    if (designsWithRatings.length === 0) return 0;
    
    const totalRating = designsWithRatings.reduce((sum, design) => sum + (design.averageRating || 0), 0);
    return (totalRating / designsWithRatings.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading your designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-red-800 text-white py-16 lg:py-20">
        <div className="container relative mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Manage <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Designs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            Manage your architectural designs, track performance, and analyze sales analytics.
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
                placeholder="Search your designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-4 items-center">
              <FaFilter className="text-gray-600" />
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
              >
                <option value="">All Categories</option>
                {designCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sales Performance Filter */}
            <select 
              value={filters.salesPerformance}
              onChange={(e) => setFilters(prev => ({ ...prev, salesPerformance: e.target.value }))}
              className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
            >
              <option value="all">All Performance</option>
              <option value="high">High Performers</option>
              <option value="low">Low Performers</option>
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
              title="Total Designs" 
              value={designs.length} 
              icon="🏠" 
              color="blue" 
            />
            <StatCard 
              title="Best Seller" 
              value={getBestSeller().title} 
              icon="🔥" 
              color="red" 
              subtitle={`${getBestSeller().sales} sales`}
            />
            <StatCard 
              title="Total Revenue" 
              value={`KES ${calculateTotalRevenue().toLocaleString()}`} 
              icon="💰" 
              color="green" 
            />
            <StatCard 
              title="Avg. Rating" 
              value={calculateAverageRating()} 
              icon="⭐" 
              color="yellow" 
              subtitle="from reviews"
            />
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaUpload className="text-red-600" />
              Add New Design
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="title"
                  placeholder="Design Title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                >
                  <option value="">Select Category</option>
                  {designCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <textarea
                  name="description"
                  placeholder="Design Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300 lg:col-span-2"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (KES)"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                  required
                />
                <input
                  type="text"
                  name="file_type"
                  placeholder="File Type (e.g., PDF/CAD, DWG, ZIP)"
                  value={form.file_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                />
                
                {/* Multiple Preview Images */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Preview Images *</label>
                  <p className="text-xs text-gray-500 mb-2">Upload multiple preview images (JPG, PNG, WebP, etc.)</p>
                  <input
                    type="file"
                    name="preview_files"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                    accept="image/*"
                    multiple
                    required
                  />
                </div>

                {/* Multiple Design Files */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Design Files *</label>
                  <p className="text-xs text-gray-500 mb-2">Upload multiple design files (PDF, CAD, ZIP, etc.)</p>
                  <input
                    type="file"
                    name="full_files"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                    multiple
                    required
                  />
                </div>

                {/* Optional Video */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Video Render (Optional)</label>
                  <p className="text-xs text-gray-500 mb-2">Upload a video render (MP4, MOV, AVI, etc.)</p>
                  <input
                    type="file"
                    name="video_file"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                    accept="video/*"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25"
              >
                Upload Design
              </button>
            </form>
          </div>

          {/* Designs Grid */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Your Designs</h2>
              <p className="text-gray-600">
                Showing <span className="font-semibold text-red-600">{filteredDesigns.length}</span> designs
              </p>
            </div>

            {filteredDesigns.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">🏗️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No designs found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDesigns.map((design) => (
                  <DesignCard
                    key={design.id}
                    design={design}
                    onEdit={handleEditDesign}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                    onUpdatePrice={handleUpdatePrice}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
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

// Design Card Component
const DesignCard = ({ 
  design, 
  onEdit, 
  onDelete, 
  onToggleFeatured, 
  onUpdatePrice, 
  onViewDetails 
}) => (
  <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
    {/* Design Image */}
    <div className="relative overflow-hidden">
      <img
        src={design.preview_url}
        alt={design.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Design Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {design.is_featured && (
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Featured
          </span>
        )}
        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {design.category}
        </span>
      </div>

      {/* View Details Overlay */}
      <div 
        className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
        onClick={() => onViewDetails(design)}
      >
        <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-2xl font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <FaExternalLinkAlt className="text-red-600" />
          View Details
        </div>
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

      {/* File Information */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <FaImages className="text-blue-500" />
          {design.preview_urls?.length || 1} images
        </span>
        {design.video_url && (
          <span className="flex items-center gap-1">
            <FaVideo className="text-green-500" />
            Video
          </span>
        )}
        <span className="flex items-center gap-1">
          <FaFile className="text-purple-500" />
          {design.design_files?.length || 1} files
        </span>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900">{design.viewCount || 0}</div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900">KES {(design.totalRevenue || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Revenue</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900 flex items-center justify-center gap-1">
            <FaStar className="text-yellow-400" />
            {design.averageRating || "0.0"}
          </div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900">{design.viewCount || 0}</div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onViewDetails(design)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          <FaExternalLinkAlt />
          Details
        </button>
        <button
          onClick={() => onEdit(design)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          <FaEdit />
          Edit
        </button>
        <button
          onClick={() => onToggleFeatured(design)}
          className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          <FaStar />
          {design.is_featured ? "Unfeature" : "Feature"}
        </button>
        <button
          onClick={() => onUpdatePrice(design)}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          <FaTag />
          Price
        </button>
        <button
          onClick={() => onDelete(design.id)}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-2xl text-sm font-semibold transition-all duration-300 col-span-2"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ManageDesigns;