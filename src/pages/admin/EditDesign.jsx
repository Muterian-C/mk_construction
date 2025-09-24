// src/pages/admin/EditDesign.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function EditDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    is_featured: 0,
  });
  const [previewFile, setPreviewFile] = useState(null);
  const [fullFile, setFullFile] = useState(null);

  useEffect(() => {
    // Fetch existing design
    axios.get(`/api/designs/${id}`).then((res) => {
      const d = res.data;
      setFormData({
        title: d.title,
        category: d.category,
        description: d.description,
        price: d.price,
        is_featured: d.is_featured,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (previewFile) data.append("preview_file", previewFile);
    if (fullFile) data.append("full_file", fullFile);

    try {
      await axios.put(`/api/designs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Design updated successfully!");
      navigate("/admin/designs");
    } catch (err) {
      alert("Error updating design: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Design</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <label className="block">
          Featured:
          <select
            name="is_featured"
            value={formData.is_featured}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>
        <div>
          <label>New Preview File:</label>
          <input type="file" onChange={(e) => setPreviewFile(e.target.files[0])} />
        </div>
        <div>
          <label>New Full File:</label>
          <input type="file" onChange={(e) => setFullFile(e.target.files[0])} />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Design
        </button>
      </form>
    </div>
  );
}
