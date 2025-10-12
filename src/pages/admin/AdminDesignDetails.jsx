// src/pages/admin/AdminDesignDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaDownload,
  FaEye,
  FaStar,
  FaShoppingCart,
  FaChartBar,
  FaTag,
  FaImages,
  FaVideo,
  FaFile,
  FaLock,
  FaUnlock,
  FaMoneyBillWave,
  FaUsers
} from "react-icons/fa";

export default function AdminDesignDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch design details with admin access
  const fetchDesignDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/designs/${id}`);
      setDesign(response.data);
    } catch (err) {
      console.error("Error fetching design details:", err);
      setError("Failed to load design details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignDetails();
  }, [id]);

  // Get all media items (images + video)
  const getMediaItems = () => {
    if (!design) return [];
    
    const items = [];

    // Add preview images
    if (design.preview_urls && design.preview_urls.length > 0) {
      design.preview_urls.forEach((url, index) => {
        items.push({
          type: 'image',
          url: url,
          index: index,
          icon: FaImages
        });
      });
    } else {
      // Fallback to single preview_url
      items.push({
        type: 'image',
        url: design.preview_url,
        index: 0,
        icon: FaImages
      });
    }

    // Add video if exists
    if (design.video_url) {
      items.push({
        type: 'video',
        url: design.video_url,
        index: items.length,
        icon: FaVideo
      });
    }

    return items;
  };

  // Handle file download (ADMIN ACCESS - no restrictions)
  const handleDownloadFile = async (fileUrl, filename) => {
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename || 'design-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  // Handle design deletion
  const handleDeleteDesign = async () => {
    if (!window.confirm("Are you sure you want to delete this design? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`/api/designs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Design deleted successfully!");
      navigate("/admin/manage-designs");
    } catch (err) {
      console.error("Error deleting design:", err);
      alert("Error deleting design: " + (err.response?.data?.error || err.message));
    }
  };

  // Handle toggle featured status
  const handleToggleFeatured = async () => {
    try {
      await axios.put(`/api/designs/${id}`, {
        is_featured: design.is_featured ? 0 : 1
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDesignDetails(); // Refresh data
      alert(`Design ${design.is_featured ? 'unfeatured' : 'featured'} successfully!`);
    } catch (err) {
      console.error("Error toggling featured status:", err);
      alert("Error updating featured status: " + (err.response?.data?.error || err.message));
    }
  };

  // Handle price update
  const handleUpdatePrice = async () => {
    const newPrice = prompt("Enter new price:", design.price);
    if (newPrice && !isNaN(newPrice)) {
      try {
        await axios.put(`/api/designs/${id}`, {
          price: parseFloat(newPrice)
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDesignDetails(); // Refresh data
        alert("Price updated successfully!");
      } catch (err) {
        console.error("Error updating price:", err);
        alert("Error updating price: " + (err.response?.data?.error || err.message));
      }
    }
  };

  const mediaItems = design ? getMediaItems() : [];
  const hasMultipleMedia = mediaItems.length > 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading design details...</p>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Design Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "The design you're looking for doesn't exist."}</p>
          <Link to="/admin/manage-designs" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform">
            Back to Manage Designs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/admin/manage-designs"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-semibold"
            >
              <FaArrowLeft /> Back to Manage Designs
            </Link>
            
            {/* Admin Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit-design/${design.id}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-semibold transition-all duration-300"
              >
                <FaEdit />
                Edit Design
              </button>
              <button
                onClick={handleDeleteDesign}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl font-semibold transition-all duration-300"
              >
                <FaTrash />
                Delete Design
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Design Preview Section */}
          <div className="space-y-6">
            {/* Main Media Display */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
              )}

              {mediaItems.length > 0 ? (
                <>
                  {/* Image or Video Display */}
                  {mediaItems[selectedPreviewIndex].type === 'image' ? (
                    <div className="relative">
                      <img
                        src={mediaItems[selectedPreviewIndex].url}
                        alt={`${design.title} - View ${selectedPreviewIndex + 1}`}
                        className={`w-full h-96 object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        onLoad={() => setImageLoading(false)}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800";
                          setImageLoading(false);
                        }}
                      />
                      {/* ADMIN OVERLAY - Different from customer view */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/30 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-white p-8">
                          <FaUnlock className="text-6xl mx-auto mb-4 opacity-80" />
                          <h3 className="text-2xl font-bold mb-2">Admin Access</h3>
                          <p className="opacity-90">Full access to all design files</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-96 bg-black">
                      <video
                        src={mediaItems[selectedPreviewIndex].url}
                        className="w-full h-full object-contain"
                        controls
                        poster={design.preview_urls?.[0] || design.preview_url}
                        onLoadedData={() => setImageLoading(false)}
                      >
                        <source src={mediaItems[selectedPreviewIndex].url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No preview available</p>
                </div>
              )}

              {/* Design Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                {design.is_featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                    ⭐ Featured Design
                  </span>
                )}
                <span className="bg-black/70 text-white px-4 py-2 rounded-2xl font-semibold backdrop-blur-sm">
                  {design.category}
                </span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-2xl font-semibold backdrop-blur-sm">
                  🔓 Admin View
                </span>
              </div>

              {/* Media Type Indicator */}
              {mediaItems[selectedPreviewIndex] && (
                <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-2 rounded-2xl font-semibold backdrop-blur-sm flex items-center gap-2">
                  {mediaItems[selectedPreviewIndex].type === 'image' ? (
                    <FaImages className="text-white" />
                  ) : (
                    <FaVideo className="text-white" />
                  )}
                  <span className="text-sm">
                    {mediaItems[selectedPreviewIndex].type === 'image' ? 'Image' : 'Video'}
                    {mediaItems.length > 1 && ` ${selectedPreviewIndex + 1}/${mediaItems.length}`}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleMedia && (
              <div className="grid grid-cols-3 gap-4">
                {mediaItems.map((media, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPreviewIndex(index)}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 aspect-video ${
                      selectedPreviewIndex === index
                        ? 'border-green-500 ring-2 ring-green-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={`${design.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-black">
                        <img
                          src={design.preview_urls?.[0] || design.preview_url}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaVideo className="text-white text-xl" />
                        </div>
                      </div>
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                      {media.type === 'image' ? 'IMG' : 'VID'}
                    </div>

                    {/* Selection Indicator */}
                    {selectedPreviewIndex === index && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Info & Admin Controls Section */}
          <div className="space-y-6">
            {/* Design Header */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-4 py-2 rounded-2xl font-semibold text-sm">
                    {design.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleToggleFeatured}
                    className="p-3 rounded-2xl bg-yellow-100 hover:bg-yellow-200 transition-colors"
                    title={design.is_featured ? "Unfeature Design" : "Feature Design"}
                  >
                    <FaStar className={`text-xl ${design.is_featured ? 'text-yellow-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {design.title}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {design.description}
              </p>

              {/* Design Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <FaEye className="text-blue-600 text-xl mx-auto mb-2" />
                  <div className="font-bold text-gray-900">{design.viewCount || 0}</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <FaDownload className="text-green-600 text-xl mx-auto mb-2" />
                  <div className="font-bold text-gray-900">{design.downloads || 0}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <FaStar className="text-yellow-500 text-xl mx-auto mb-2" />
                  <div className="font-bold text-gray-900">{design.rating || "4.8"}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              {/* Media Info */}
              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaImages className="text-blue-600" />
                      <span>{design.preview_urls?.length || 1} Preview Images</span>
                    </div>
                    {design.video_url && (
                      <div className="flex items-center gap-2">
                        <FaVideo className="text-green-600" />
                        <span>Video Render Included</span>
                      </div>
                    )}
                  </div>
                  <div className="text-blue-700 font-semibold">
                    {design.design_files?.length || 1} Design Files
                  </div>
                </div>
              </div>

              {/* Price Section with Admin Controls */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      KES {design.price?.toLocaleString() || "0"}
                    </div>
                    <div className="text-green-600 font-semibold">Current Price</div>
                  </div>
                  <button
                    onClick={handleUpdatePrice}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <FaTag />
                    Update Price
                  </button>
                </div>
              </div>

              {/* Admin Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate(`/admin/edit-design/${design.id}`)}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  <FaEdit />
                  Edit Design
                </button>
                <button
                  onClick={handleToggleFeatured}
                  className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  <FaStar />
                  {design.is_featured ? "Unfeature" : "Feature"}
                </button>
              </div>
            </div>

            {/* File Downloads - ADMIN ACCESS */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Files - Admin Access</h3>

              {/* Preview Images Download */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaImages className="text-blue-500" />
                  Preview Images ({design.preview_urls?.length || 1})
                </h4>
                <div className="space-y-2">
                  {design.preview_urls?.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadFile(url, `preview-${index + 1}.jpg`)}
                      className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-4 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <FaImages className="text-blue-500 text-xl" />
                        <div>
                          <div className="font-medium text-gray-900">Preview Image {index + 1}</div>
                          <div className="text-sm text-gray-600">Click to download</div>
                        </div>
                      </div>
                      <FaDownload className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Download */}
              {design.video_url && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FaVideo className="text-green-500" />
                    Video Render
                  </h4>
                  <button
                    onClick={() => handleDownloadFile(design.video_url, 'design-video.mp4')}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <FaVideo className="text-green-500 text-xl" />
                      <div>
                        <div className="font-medium text-gray-900">Design Video Render</div>
                        <div className="text-sm text-gray-600">MP4 file - Click to download</div>
                      </div>
                    </div>
                    <FaDownload className="text-gray-400" />
                  </button>
                </div>
              )}

              {/* Design Files Download - FULL ACCESS */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaUnlock className="text-green-500" />
                  Design Files - Full Access ({design.design_files?.length || design.full_file_urls?.length || 0})
                </h4>
                <div className="space-y-2">
                  {/* From design_files table (preferred) */}
                  {design.design_files && design.design_files.length > 0 ? (
                    design.design_files.map((file, index) => (
                      <button
                        key={index}
                        onClick={() => handleDownloadFile(file.file_url, file.filename)}
                        className="w-full flex items-center justify-between bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-4 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <FaFile className="text-green-600 text-xl" />
                          <div>
                            <div className="font-medium text-gray-900">{file.filename}</div>
                            <div className="text-sm text-gray-600">
                              {file.file_type} • {(file.file_size / (1024 * 1024)).toFixed(1)} MB
                            </div>
                          </div>
                        </div>
                        <FaDownload className="text-green-600" />
                      </button>
                    ))
                  ) : (
                    /* Fallback to full_file_urls */
                    design.full_file_urls?.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => handleDownloadFile(url, `design-file-${index + 1}`)}
                        className="w-full flex items-center justify-between bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-4 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <FaFile className="text-green-600 text-xl" />
                          <div>
                            <div className="font-medium text-gray-900">Design File {index + 1}</div>
                            <div className="text-sm text-gray-600">Click to download</div>
                          </div>
                        </div>
                        <FaDownload className="text-green-600" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Design Analytics */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Analytics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <FaEye className="text-blue-600 text-xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{design.viewCount || 0}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <FaDownload className="text-green-600 text-xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{design.downloads || 0}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-2xl">
                  <FaStar className="text-yellow-600 text-xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{design.rating || "0.0"}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <FaMoneyBillWave className="text-purple-600 text-xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">KES {design.price?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}