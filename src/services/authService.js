const API_ROOT = import.meta.env.VITE_APP_ROOT_API;

export const login = async (username, password) => {
  const response = await fetch(`${API_ROOT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Tài khoản hoặc mật khẩu không đúng.");
  }

  return response.json();
};

export const register = async (username, password, roles) => {
  const response = await fetch(`${API_ROOT}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, roles }),
  });

  if (!response.ok) {
    throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
  }

  return response.json();
};