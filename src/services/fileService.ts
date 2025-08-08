import api from "../utils/api";

export const uploadFiles = async (files: File[]) => {
  try {
    if (files.length > 10) {
      throw new Error("Bạn chỉ có thể tải lên tối đa 10 file cùng lúc");
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải lên file:", error);
    throw error;
  }
};
