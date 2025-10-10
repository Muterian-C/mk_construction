import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import {
  FaUpload,
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaFileCode,
  FaFile,
  FaVideo,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes
} from "react-icons/fa";

// Supported file formats configuration
const SUPPORTED_FORMATS = {
  images: {
    name: "Image Files",
    extensions: [".jpg", ".jpeg", ".png", ".tiff", ".tif", ".bmp", ".webp", ".gif"],
    maxSize: 10 * 1024 * 1024, // 10MB
    icon: FaFileImage,
    color: "text-green-500",
    accept: "image/*"
  },
  videos: {
    name: "Video Files",
    extensions: [".mp4", ".mov", ".avi", ".webm", ".mkv"],
    maxSize: 50 * 1024 * 1024, // 50MB
    icon: FaVideo,
    color: "text-purple-500",
    accept: "video/*"
  },
  documents: {
    name: "Document Files",
    extensions: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
    maxSize: 20 * 1024 * 1024, // 20MB
    icon: FaFilePdf,
    color: "text-red-500",
    accept: ".pdf,.doc,.docx,.txt,.rtf"
  },
  cad: {
    name: "CAD Files",
    extensions: [".dwg", ".dxf", ".dgn", ".stl", ".skp", ".3dm", ".rvt", ".rfa", ".ifc"],
    maxSize: 50 * 1024 * 1024, // 50MB
    icon: FaFileCode,
    color: "text-blue-500",
    accept: ".dwg,.dxf,.dgn,.stl,.skp,.3dm,.rvt,.rfa,.ifc"
  },
  vector: {
    name: "Vector Files",
    extensions: [".ai", ".eps", ".svg", ".cdr"],
    maxSize: 25 * 1024 * 1024, // 25MB
    icon: FaFileCode,
    color: "text-purple-500",
    accept: ".ai,.eps,.svg,.cdr"
  },
  archives: {
    name: "Archive Files",
    extensions: [".zip", ".rar", ".7z", ".tar", ".gz"],
    maxSize: 100 * 1024 * 1024, // 100MB
    icon: FaFileArchive,
    color: "text-yellow-600",
    accept: ".zip,.rar,.7z,.tar,.gz"
  },
  spreadsheets: {
    name: "Spreadsheet Files",
    extensions: [".xls", ".xlsx", ".csv"],
    maxSize: 10 * 1024 * 1024, // 10MB
    icon: FaFile,
    color: "text-green-600",
    accept: ".xls,.xlsx,.csv"
  }
};

const AddDesign = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    is_featured: false,
    file_type: "PDF/CAD"
  });
  const [previewFiles, setPreviewFiles] = useState([]);
  const [fullFiles, setFullFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Get file type information
  const getFileInfo = (file) => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    for (const [type, info] of Object.entries(SUPPORTED_FORMATS)) {
      if (info.extensions.includes(extension)) {
        return { type, ...info };
      }
    }
    return null;
  };

  // Validate file
  const validateFile = (file, fileType = 'any') => {
    const fileInfo = getFileInfo(file);
    
    if (!fileInfo) {
      return {
        valid: false,
        message: `Unsupported file format: ${file.name}`
      };
    }

    if (file.size > fileInfo.maxSize) {
      const maxSizeMB = fileInfo.maxSize / (1024 * 1024);
      return {
        valid: false,
        message: `File too large: ${file.name}. Maximum size: ${maxSizeMB}MB`
      };
    }

    // Specific validation for file types
    if (fileType === 'preview' && fileInfo.type !== 'images') {
      return {
        valid: false,
        message: "Preview files must be images (JPG, PNG, WebP, GIF)"
      };
    }

    if (fileType === 'video' && fileInfo.type !== 'videos') {
      return {
        valid: false,
        message: "Video files must be MP4, MOV, AVI, WebM, or MKV"
      };
    }

    return { valid: true, fileInfo };
  };

  const handlePreviewFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newErrors = [];

    files.forEach((file, index) => {
      const validation = validateFile(file, 'preview');
      if (validation.valid) {
        validFiles.push(file);
      } else {
        newErrors.push(validation.message);
      }
    });

    if (newErrors.length > 0) {
      setErrors(prev => ({ ...prev, previewFiles: newErrors[0] }));
    } else {
      setErrors(prev => ({ ...prev, previewFiles: null }));
    }

    setPreviewFiles(prev => [...prev, ...validFiles]);
  };

  const handleFullFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newErrors = [];

    files.forEach((file, index) => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        newErrors.push(validation.message);
      }
    });

    if (newErrors.length > 0) {
      setErrors(prev => ({ ...prev, fullFiles: newErrors[0] }));
    } else {
      setErrors(prev => ({ ...prev, fullFiles: null }));
    }

    setFullFiles(prev => [...prev, ...validFiles]);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file, 'video');
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, videoFile: validation.message }));
      setVideoFile(null);
      return;
    }

    setErrors(prev => ({ ...prev, videoFile: null }));
    setVideoFile(file);
  };

  const removePreviewFile = (index) => {
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeFullFile = (index) => {
    setFullFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideoFile = () => {
    setVideoFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check authentication
    if (!isAuthenticated || !user) {
      alert("❌ Please log in to add designs");
      navigate("/login");
      return;
    }

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (previewFiles.length === 0) newErrors.previewFiles = "At least one preview image is required";
    if (fullFiles.length === 0) newErrors.fullFiles = "At least one design file is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = new FormData();
    submitData.append("user_id", user.id); // Use actual user ID from context
    submitData.append("title", formData.title.trim());
    submitData.append("category", formData.category.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("price", formData.price);
    submitData.append("file_type", formData.file_type);
    submitData.append("is_featured", formData.is_featured ? 1 : 0);

    // Append multiple preview files
    previewFiles.forEach(file => {
      submitData.append("preview_files[]", file);
    });

    // Append multiple design files
    fullFiles.forEach(file => {
      submitData.append("full_files[]", file);
    });

    // Append video file if exists
    if (videoFile) {
      submitData.append("video_file", videoFile);
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      await api.post("/api/adddesigns", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      alert("✅ Design added successfully!");
      navigate("/admin/designs");
    } catch (err) {
      console.error("Upload error:", err);
      
      // Enhanced error handling
      if (err.response?.data?.error === "User does not exist") {
        alert("❌ Authentication error. Please log in again.");
        navigate("/login");
      } else if (err.response?.data?.error) {
        alert(`❌ ${err.response.data.error}`);
      } else {
        alert("❌ Failed to add design. Please try again.");
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FilePreview = ({ file, onRemove, error, index }) => {
    const fileInfo = file ? getFileInfo(file) : null;
    
    return (
      <div className={`border rounded-lg p-3 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {fileInfo ? (
              <fileInfo.icon className={`text-lg ${fileInfo.color}`} />
            ) : (
              <FaFile className="text-lg text-gray-500" />
            )}
            <div>
              <p className="font-medium text-sm">{file?.name}</p>
              <p className="text-xs text-gray-600">
                {file ? formatFileSize(file.size) : 'No file selected'}
                {fileInfo && ` • ${fileInfo.name}`}
              </p>
            </div>
          </div>
          {file && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-2 flex items-center">
            <FaExclamationTriangle className="mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const MultiFilePreview = ({ files, onRemove, error, title }) => (
    <div className="space-y-2">
      {files.map((file, index) => (
        <FilePreview
          key={index}
          file={file}
          onRemove={onRemove}
          error={index === 0 ? error : null} // Show error only on first item
          index={index}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Add New Design</h2>
            <p className="text-gray-600 mt-2">Upload your architectural designs and files</p>
            {user && (
              <p className="text-sm text-green-600 mt-1">
                Logged in as: {user.username || user.email}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Design Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter design title"
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Interior">Interior Design</option>
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your design, features, and specifications..."
                rows="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Price (KES) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter price"
                  min="0"
                  step="100"
                />
                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  File Type
                </label>
                <input
                  type="text"
                  name="file_type"
                  value={formData.file_type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PDF/CAD, DWG, ZIP"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              {/* Multiple Preview Images */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Preview Images * ({previewFiles.length} selected)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload multiple high-quality preview images (JPG, PNG, WebP, GIF - max 10MB each)
                </p>
                <input
                  type="file"
                  onChange={handlePreviewFilesChange}
                  accept="image/*"
                  multiple
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-3">
                  <MultiFilePreview 
                    files={previewFiles}
                    onRemove={removePreviewFile}
                    error={errors.previewFiles}
                    title="Preview Images"
                  />
                </div>
              </div>

              {/* Video Render (Optional) */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Video Render (Optional)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload a video render (MP4, MOV, AVI - max 50MB)
                </p>
                <input
                  type="file"
                  onChange={handleVideoFileChange}
                  accept="video/*"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {videoFile && (
                  <div className="mt-3">
                    <FilePreview 
                      file={videoFile}
                      onRemove={removeVideoFile}
                      error={errors.videoFile}
                    />
                  </div>
                )}
              </div>

              {/* Multiple Design Files */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Design Files * ({fullFiles.length} selected)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload multiple design files (CAD, PDF, Archives, etc. - max 100MB each)
                </p>
                <input
                  type="file"
                  onChange={handleFullFilesChange}
                  multiple
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-3">
                  <MultiFilePreview 
                    files={fullFiles}
                    onRemove={removeFullFile}
                    error={errors.fullFiles}
                    title="Design Files"
                  />
                </div>
              </div>
            </div>

            {/* Supported Formats */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Supported File Formats:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {Object.entries(SUPPORTED_FORMATS).map(([key, format]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <format.icon className={`text-sm ${format.color}`} />
                    <span className="text-blue-700">{format.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label className="font-medium text-gray-700">Mark as Featured Design</label>
            </div>

            {loading && uploadProgress > 0 && (
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading Design...
                </>
              ) : (
                <>
                  <FaUpload />
                  Add Design
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDesign;