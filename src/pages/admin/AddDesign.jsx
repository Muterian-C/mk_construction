import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  FaUpload,
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaFileCode,
  FaFile,
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

const ALL_ACCEPTED_FILES = Object.values(SUPPORTED_FORMATS)
  .map(format => format.accept)
  .join(',');

const AddDesign = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    is_featured: false,
    file_type: "PDF/CAD" // Default file type
  });
  const [previewFile, setPreviewFile] = useState(null);
  const [fullFile, setFullFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  // Get file type information
  const getFileInfo = (file) => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    for (const [type, info] of Object.entries(SUPPORTED_FORMATS)) {
      if (info.extensions.includes(extension)) {
        return { type, ...info };
      }
    }
    return null; // Unsupported format
  };

  // Validate file
  const validateFile = (file, isPreview = false) => {
    const fileInfo = getFileInfo(file);
    
    if (!fileInfo) {
      return {
        valid: false,
        message: `Unsupported file format: ${file.name}. Supported formats: ${Object.values(SUPPORTED_FORMATS).map(f => f.name).join(', ')}`
      };
    }

    if (file.size > fileInfo.maxSize) {
      const maxSizeMB = fileInfo.maxSize / (1024 * 1024);
      return {
        valid: false,
        message: `File too large: ${file.name}. Maximum size: ${maxSizeMB}MB`
      };
    }

    // Additional validation for preview files (should be images)
    if (isPreview && !fileInfo.extensions.some(ext => ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext))) {
      return {
        valid: false,
        message: "Preview file must be an image (JPG, PNG, WebP, GIF)"
      };
    }

    return { valid: true, fileInfo };
  };

  const handlePreviewFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file, true);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, previewFile: validation.message }));
      setPreviewFile(null);
      return;
    }

    setErrors(prev => ({ ...prev, previewFile: null }));
    setPreviewFile(file);
  };

  const handleFullFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, fullFile: validation.message }));
      setFullFile(null);
      return;
    }

    setErrors(prev => ({ ...prev, fullFile: null }));
    setFullFile(file);
    
    // Auto-set file type based on uploaded file
    if (validation.fileInfo) {
      setFormData(prev => ({
        ...prev,
        file_type: validation.fileInfo.name
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!previewFile) newErrors.previewFile = "Preview file is required";
    if (!fullFile) newErrors.fullFile = "Design file is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = new FormData();
    submitData.append("user_id", 1); // Replace with logged-in user ID from auth context
    submitData.append("title", formData.title.trim());
    submitData.append("category", formData.category.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("price", formData.price);
    submitData.append("file_type", formData.file_type);
    submitData.append("is_featured", formData.is_featured ? 1 : 0);
    submitData.append("preview_file", previewFile);
    submitData.append("full_file", fullFile);

    try {
      setLoading(true);
      setUploadProgress(0);

      await api.post("/api/designs", submitData, {
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
      alert("❌ Failed to add design. Please try again.");
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

  const FilePreview = ({ file, onRemove, error }) => {
    const fileInfo = file ? getFileInfo(file) : null;
    
    return (
      <div className={`border rounded-lg p-4 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {fileInfo ? (
              <fileInfo.icon className={`text-xl ${fileInfo.color}`} />
            ) : (
              <FaFile className="text-xl text-gray-500" />
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
              onClick={onRemove}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Add New Design</h2>
            <p className="text-gray-600 mt-2">Upload your architectural designs and files</p>
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
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
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
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
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
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
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
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Preview Image *
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload a high-quality preview image (JPG, PNG, WebP, GIF - max 10MB)
                </p>
                <input
                  type="file"
                  onChange={handlePreviewFileChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FilePreview 
                  file={previewFile} 
                  error={errors.previewFile}
                  onRemove={() => setPreviewFile(null)}
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Design Files *
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload your design files (CAD, PDF, Archives, etc. - max 100MB)
                </p>
                <input
                  type="file"
                  onChange={handleFullFileChange}
                  accept={ALL_ACCEPTED_FILES}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FilePreview 
                  file={fullFile} 
                  error={errors.fullFile}
                  onRemove={() => setFullFile(null)}
                />
              </div>
            </div>

            {/* Supported Formats Info */}
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

            {/* Upload Progress */}
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
              disabled={loading}
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