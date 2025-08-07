import api from "../utils/api";

export const getAllUnits = async (page, pageSize) => {
  try {
    const response = await api.get("/units", {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching units:", error);
    throw error;
  }
};
