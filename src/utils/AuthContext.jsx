import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, removeTokens, isAuthenticated } from "../utils/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUserFromToken();
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = (tokens) => {
    const { accessToken, refreshToken } = tokens;

    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    const userData = getUserFromToken();

    if (userData) {
      setUser(userData);
      if (userData.roles.includes("ADMIN")) {
        toast.success("Đăng nhập thành công với quyền Admin");
        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 100);
      } else if (userData.roles.includes("EMPLOYEE")) {
        toast.success("Đăng nhập thành công với quyền Nhân viên");
        setTimeout(() => {
          navigate("/employee/dashboard", { replace: true });
        }, 100);
      } else {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      }
    } else {
      toast.error("Không thể xác thực. Vui lòng đăng nhập lại.");
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    removeTokens();
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
  };

  const hasRole = (requiredRoles) => {
    if (!user || !user.roles) return false;

    if (user.roles.includes("ADMIN")) return true;

    // Kiểm tra xem người dùng có ít nhất một trong các vai trò yêu cầu không
    return requiredRoles.some((role) => user.roles.includes(role));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        hasRole,
        isAuthenticated: () => !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
