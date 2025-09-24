import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // your Axios instance

const AddDesign = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [fullFile, setFullFile] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !previewFile || !fullFile) {
      alert("Please fill in all required fields and upload both files");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", 1); // Replace with logged-in user ID from auth context
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("is_featured", isFeatured ? 1 : 0);
    formData.append("preview_file", previewFile);
    formData.append("full_file", fullFile);

    try {
      setLoading(true);
      await api.post("/api/designs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Design added successfully!");
      navigate("/admin/designs");
    } catch (err) {
      alert("❌ Failed to add design. Check console for details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Design</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Design Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter design title"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category *</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Residential, Commercial"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Short description (optional)"
              rows="3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price (KES) *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preview File *</label>
            <input
              type="file"
              onChange={(e) => setPreviewFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Full File *</label>
            <input
              type="file"
              onChange={(e) => setFullFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <span>Mark as Featured</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Uploading..." : "Add Design"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDesign;
