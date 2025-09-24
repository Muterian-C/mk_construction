import api from "./axios"; // this uses your axios instance (with token support)

// Add new design
export const addDesign = async (formData) => {
  try {
    const res = await api.post("/designs/", formData, {
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

// (Optional) Get designs list
export const getDesigns = async () => {
  try {
    const res = await api.get("/designs/");
    return res.data;
  } catch (error) {
    console.error("Error fetching designs:", error);
    throw error;
  }
};
