import api from "./axios"; // this uses your axios instance (with token support)

// Add new design
export const addDesign = async (formData) => {
  try {
    const res = await api.post("/api/designs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading design:", error);
    throw error;
  }
};

// Get designs list
export const getDesigns = async () => {
  try {
    const res = await api.get("/api/designs");
    return res.data;
  } catch (error) {
    console.error("Error fetching designs:", error);
    throw error;
  }
};

// Get single design with stats
export const getDesign = async (id) => {
  try {
    const [designRes, statsRes] = await Promise.all([
      api.get(`/api/designs/${id}`),
      api.get(`/api/designs/${id}/stats`)
    ]);

    const design = designRes.data;
    const stats = statsRes.data;

    // Merge design with stats and add default values
    return {
      ...design,
      viewCount: stats.view_count || 0,
      downloads: stats.sales_count || 0, // Using sales_count as downloads
      rating: stats.average_rating || 0,
      fileType: "PDF/CAD", // Default
      features: [
        "Full CAD files included",
        "High-resolution renders",
        "Multiple view angles",
        "Material specifications",
        "Measurement details",
        "Customization ready"
      ] // Default features
    };
  } catch (error) {
    console.error("Error fetching design:", error);
    throw error;
  }
};
