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

export const getUserFromToken = () => {
  const decoded = getDecodedToken();
  if (decoded) {
    return {
      username: decoded.sub || "",
      roles: decoded.roles || [],
    };
  }
  return null;
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};