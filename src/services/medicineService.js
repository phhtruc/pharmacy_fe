import api from "../utils/api";

export const getAllMedicines = async (page, pageSize) => {
    try {
        const response = await api.get("/medicines", {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching medicines:", error);
        throw error;
    }
};

export const deleteMedicine = async (id) => {
  try {
    const response = await api.delete(`/medicines/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};
