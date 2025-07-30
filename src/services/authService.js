const API_ROOT = import.meta.env.VITE_APP_ROOT_API;

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_ROOT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);
    
    if (!response.ok) {
      throw new Error(data.message || "Tài khoản hoặc mật khẩu không đúng.");
    }

    return { data };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
  }
};

export const register = async (username, password, email, fullName) => {
  try {
    const response = await fetch(`${API_ROOT}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, fullName }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }

    return { data };
  } catch (error) {
    console.error("Register error:", error);
    throw new Error(error.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${API_ROOT}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Không thể làm mới token.");
    }

    return { data };
  } catch (error) {
    console.error("Refresh token error:", error);
    throw new Error(error.message || "Đã xảy ra lỗi khi làm mới token.");
  }
};