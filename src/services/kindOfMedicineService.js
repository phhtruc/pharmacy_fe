import api from "../utils/api";

export const getAllKindOfMedicines = async (page, size) => {
  try {
    const response = await api.get("/kinds-of-medicine", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching kind of medicine:", error);
    throw error;
  }
};
