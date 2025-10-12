// src/pages/admin/EditDesign.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
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
  FaTimes,
  FaArrowLeft
} from "react-icons/fa";

// Supported file formats configuration (same as AddDesign)
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

export default function EditDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    is_featured: 0,
    file_type: "PDF/CAD"
  });

  const [previewFiles, setPreviewFiles] = useState([]);
  const [fullFiles, setFullFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  // Current files (for display)
  const [currentPreviews, setCurrentPreviews] = useState([]);
  const [currentDesignFiles, setCurrentDesignFiles] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchDesignDetails();
  }, [id]);

  const fetchDesignDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/designs/${id}`);
      const design = response.data;
      
      setFormData({
        title: design.title || "",
        category: design.category || "",
        description: design.description || "",
        price: design.price || "",
        is_featured: design.is_featured ? 1 : 0,
        file_type: design.fileType || "PDF/CAD"
      });

      // Set current files for display
      setCurrentPreviews(design.preview_urls || [design.preview_url]);
      setCurrentDesignFiles(design.design_files || []);
      setCurrentVideo(design.video_url || null);

    } catch (err) {
      console.error("Error fetching design details:", err);
      alert("Failed to load design details.");
    } finally {
      setLoading(false);
    }
  };

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

    files.forEach((file) => {
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

    files.forEach((file) => {
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
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
    
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = new FormData();
    
    // Append basic form data
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    // Append multiple preview files (if any new ones added)
    previewFiles.forEach(file => {
      submitData.append("preview_files[]", file);
    });

    // Append multiple design files (if any new ones added)
    fullFiles.forEach(file => {
      submitData.append("full_files[]", file);
    });

    // Append video file (if new one added)
    if (videoFile) {
      submitData.append("video_file", videoFile);
    }

    try {
      setUpdating(true);
      
      await axios.put(`/api/designs/${id}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Design updated successfully!");
      navigate("/admin/manage-designs");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update design: " + (err.response?.data?.error || err.message));
    } finally {
      setUpdating(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FilePreview = ({ file, onRemove, error, index, isCurrent = false, url }) => {
    const fileInfo = file ? getFileInfo(file) : null;
    const displayName = file?.name || (url ? url.split('/').pop() : 'Unknown file');
    
    return (
      <div className={`border rounded-lg p-3 ${error ? 'border-red-300 bg-red-50' : isCurrent ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {fileInfo ? (
              <fileInfo.icon className={`text-lg ${fileInfo.color}`} />
            ) : (
              <FaFile className="text-lg text-gray-500" />
            )}
            <div>
              <p className="font-medium text-sm">{displayName}</p>
              <p className="text-xs text-gray-600">
                {file ? formatFileSize(file.size) : (isCurrent ? 'Current file' : 'No file selected')}
                {fileInfo && ` • ${fileInfo.name}`}
                {isCurrent && <span className="text-green-600 ml-2">✓ Current</span>}
              </p>
            </div>
          </div>
          {file && !isCurrent && (
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

  const MultiFilePreview = ({ files, onRemove, error, title, isCurrent = false, urls = [] }) => (
    <div className="space-y-2">
      {/* Show current files */}
      {isCurrent && urls.map((url, index) => (
        <FilePreview
          key={`current-${index}`}
          url={url}
          isCurrent={true}
        />
      ))}
      
      {/* Show new files to be uploaded */}
      {files.map((file, index) => (
        <FilePreview
          key={`new-${index}`}
          file={file}
          onRemove={onRemove}
          error={index === 0 ? error : null}
          index={index}
        />
      ))}
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/admin/manage-designs")}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-semibold"
            >
              <FaArrowLeft /> Back to Designs
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Edit Design</h2>
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
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., PDF/CAD, DWG, ZIP"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              {/* Multiple Preview Images */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Preview Images ({previewFiles.length} new selected)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Add new preview images (will replace existing ones if any new files are added)
                </p>
                <input
                  type="file"
                  onChange={handlePreviewFilesChange}
                  accept="image/*"
                  multiple
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="mt-3">
                  <MultiFilePreview 
                    files={previewFiles}
                    onRemove={removePreviewFile}
                    error={errors.previewFiles}
                    title="Preview Images"
                    isCurrent={previewFiles.length === 0}
                    urls={currentPreviews}
                  />
                </div>
              </div>

              {/* Video Render */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Video Render
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Replace current video (leave empty to keep current)
                </p>
                <input
                  type="file"
                  onChange={handleVideoFileChange}
                  accept="video/*"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="mt-3">
                  {currentVideo && !videoFile && (
                    <FilePreview 
                      url={currentVideo}
                      isCurrent={true}
                    />
                  )}
                  {videoFile && (
                    <FilePreview 
                      file={videoFile}
                      onRemove={removeVideoFile}
                      error={errors.videoFile}
                    />
                  )}
                </div>
              </div>

              {/* Multiple Design Files */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Design Files ({fullFiles.length} new selected)
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Add new design files (will replace existing ones if any new files are added)
                </p>
                <input
                  type="file"
                  onChange={handleFullFilesChange}
                  multiple
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="mt-3">
                  <MultiFilePreview 
                    files={fullFiles}
                    onRemove={removeFullFile}
                    error={errors.fullFiles}
                    title="Design Files"
                    isCurrent={fullFiles.length === 0}
                    urls={currentDesignFiles.map(file => file.file_url || file.filename)}
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
                checked={formData.is_featured === 1}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_featured: e.target.checked ? 1 : 0
                }))}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <label className="font-medium text-gray-700">Mark as Featured Design</label>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Updating Design...
                </>
              ) : (
                <>
                  <FaUpload />
                  Update Design
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}