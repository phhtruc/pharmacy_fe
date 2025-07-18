import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

export const isTokenExpired = () => {
  const decoded = getDecodedToken();
  if (decoded) {
    const currentTime = Date.now() / 1000; // Thời gian hiện tại (tính bằng giây)
    return decoded.exp < currentTime;
  }
  return true; // Nếu không có token, coi như đã hết hạn
};

export const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
