// src/pages/DesignDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaLock,
  FaDownload,
  FaEye,
  FaStar,
  FaShare,
  FaHeart,
  FaCheckCircle,
  FaMobile,
  FaPaypal,
  FaCreditCard,
  FaPlay,
  FaImages,
  FaVideo
} from "react-icons/fa";

export default function DesignDetails() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await api.get(`/api/designs/${id}`);
        setDesign(response.data);
      } catch (err) {
        console.error("Error fetching design details:", err);
        setError("Failed to load design details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [id]);

  const handleAddToCart = async () => {
    if (design) {
      try {
        await addToCart(design.id);
        alert(`${design.title} added to cart!`);
      } catch (error) {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  const handleBuyNow = async () => {
    if (design) {
      try {
        await addToCart(design.id);
        window.location.href = '/checkout';
      } catch (error) {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  // Get all media items (images + video)
  const getMediaItems = () => {
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

  const mediaItems = design ? getMediaItems() : [];
  const hasMultipleMedia = mediaItems.length > 1;

  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", icon: FaMobile, color: "from-green-500 to-emerald-600" },
    { id: "paypal", name: "PayPal", icon: FaPaypal, color: "from-blue-500 to-cyan-600" },
    { id: "card", name: "Credit Card", icon: FaCreditCard, color: "from-purple-500 to-indigo-600" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading design details...</p>
        </div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Design Not Found</h2>
          <p className="text-gray-600 mb-8">The design you're looking for doesn't exist.</p>
          <Link to="/designs" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform">
            Browse Designs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/designs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-semibold"
          >
            <FaArrowLeft /> Back to Gallery
          </Link>
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}

              {mediaItems.length > 0 ? (
                <>
                  {/* Image or Video Display */}
                  {mediaItems[selectedPreviewIndex].type === 'image' ? (
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
                  ) : (
                    <div className="relative w-full h-96 bg-black">
                      <video
                        src={mediaItems[selectedPreviewIndex].url}
                        className="w-full h-full object-cover"
                        controls
                        poster={design.preview_urls?.[0] || design.preview_url}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaPlay className="text-white text-6xl opacity-80" />
                      </div>
                    </div>
                  )}

                  {/* Watermark Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center ${mediaItems[selectedPreviewIndex].type === 'image'
                      ? 'bg-gradient-to-br from-black/30 to-black/50 pointer-events-none'
                      : 'bg-gradient-to-br from-black/10 to-black/20 pointer-events-none'
                    }`}>
                    <div className={`text-center text-white p-8 ${mediaItems[selectedPreviewIndex].type === 'image'
                        ? 'opacity-100'
                        : 'opacity-40'
                      }`}>
                      <FaLock className="text-6xl mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Watermarked Preview</h3>
                      <p className="opacity-90">Purchase to unlock full-resolution files</p>
                    </div>
                  </div>
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
              </div>

              {/* Media Type Indicator */}
              {mediaItems[selectedPreviewIndex] && (
                <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-2 rounded-2xl font-semibold backdrop-blur-sm flex items-center gap-2">
                  {mediaItems[selectedPreviewIndex] && (
                    <>
                      {mediaItems[selectedPreviewIndex].type === 'image' ? (
                        <FaImages className="text-white" />
                      ) : (
                        <FaVideo className="text-white" />
                      )}
                      <span className="text-sm">
                        {mediaItems[selectedPreviewIndex].type === 'image' ? 'Image' : 'Video'}
                        {mediaItems.length > 1 && ` ${selectedPreviewIndex + 1}/${mediaItems.length}`}
                      </span>
                    </>
                  )}
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
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 aspect-video ${selectedPreviewIndex === index
                      ? 'border-blue-500 ring-2 ring-blue-200'
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
                      <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Info & Purchase Section */}
          <div className="space-y-6">
            {/* Design Header */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-2xl font-semibold text-sm">
                    {design.category}
                  </span>
                </div>
                <button className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaHeart className="text-gray-600 text-xl" />
                </button>
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

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      KES {design.price?.toLocaleString() || "0"}
                    </div>
                    <div className="text-green-600 font-semibold">One-time purchase</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">File included:</div>
                    <div className="font-semibold">{design.fileType || "PDF/CAD"}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleBuyNow}
                  className="group w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-400/25 flex items-center justify-center gap-3"
                >
                  <FaLock />
                  Buy Now & Unlock Design
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-400/25 flex items-center justify-center gap-3"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-4">Secure payment methods:</h4>
                <div className="flex gap-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className={`p-3 rounded-2xl bg-gradient-to-r ${method.color} text-white`}>
                      <method.icon className="text-2xl" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features & Specifications */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(design.features || [
                  "Full CAD files included",
                  "High-resolution renders",
                  "Multiple view angles",
                  "Material specifications",
                  "Measurement details",
                  "Customization ready"
                ]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* File Details */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">File Details</h3>

              {/* Included Files */}
              {design.design_files && design.design_files.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Included Files:</h4>
                  <div className="space-y-2">
                    {design.design_files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="text-gray-600">
                            {file.file_type === 'cad' && '📐'}
                            {file.file_type === 'document' && '📄'}
                            {file.file_type === 'archive' && '📦'}
                            {file.file_type === 'image' && '🖼️'}
                            {file.file_type === 'video' && '🎥'}
                            {!['cad', 'document', 'archive', 'image', 'video'].includes(file.file_type) && '📎'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{file.filename}</div>
                            <div className="text-sm text-gray-600 capitalize">{file.file_type}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {file.file_size ? `${(file.file_size / (1024 * 1024)).toFixed(1)} MB` : 'Size unknown'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">File Format:</span>
                  <span className="font-semibold">{design.fileType || "PDF/CAD"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Files:</span>
                  <span className="font-semibold">{design.design_files?.length || 1} files</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Compatibility:</span>
                  <span className="font-semibold">AutoCAD, PDF Viewer, Standard Image/Video Players</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Updates:</span>
                  <span className="font-semibold text-green-600">Free minor updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}