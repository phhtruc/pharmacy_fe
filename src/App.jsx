import React from "react";
import UserNavbar from "./layouts/user/Navbar";
import UserFooter from "./layouts/user/Footer";
import AdminNavbar from "./layouts/admin/Navbar";
import EmployeeSidebar from "./layouts/employee/Sidebar";
import AdminFooter from "./layouts/admin/Footer";
import AdminSidebar from "./layouts/admin/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout cho User
const UserLayout = ({ children }) => {
  return (
    <div className="site-wrap">
      <UserNavbar />
      {children}
      <UserFooter />
    </div>
  );
};

// Layout cho Admin
const AdminLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <AdminSidebar />
      <AdminNavbar />
      {children}
      <AdminFooter />
    </div>
  );
};

// Layout Employee
const EmployeeLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <EmployeeSidebar />
      <AdminNavbar />
      {children}
      <AdminFooter />
    </div>
  );
};

// Layout mặc định (không có sidebar, navbar, footer)
const DefaultLayout = ({ children }) => {
  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Xác định layout dựa trên đường dẫn
  const getLayout = () => {
    // Các trang không cần layout
    if (["/login", "/register"].includes(pathname)) {
      return (
        <DefaultLayout>
          <AppRoutes />
        </DefaultLayout>
      );
    }

    // Các trang admin
    if (pathname.startsWith("/admin")) {
      return (
        <AdminLayout>
          <AppRoutes />
        </AdminLayout>
      );
    }

    // Các trang employee
    if (pathname.startsWith("/employee")) {
      return (
        <EmployeeLayout>
          <AppRoutes />
        </EmployeeLayout>
      );
    }

    // Các trang user (mặc định)
    return (
      <UserLayout>
        <AppRoutes />
      </UserLayout>
    );
  };

  return (
    <>
      {getLayout()}
      <ToastContainer />
    </>
  );
};

const App = () => {
  return <AppContent />;
};

const AppWrapper = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
};

export default AppWrapper;
