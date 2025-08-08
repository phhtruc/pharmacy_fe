import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import HomeEmployee from "../pages/employee/Home";
import HomeAdmin from "../pages/admin/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../utils/AuthContext";
import MedicineManager from "../pages/employee/MedicineManager";
import CreateMedicine from "../pages/employee/CreateMedicine";
import UpdateMedicine from "../pages/employee/UpdateMedicine";
import DetailMedicine from "../pages/employee/DetailMedicine";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected routes */}
      <Route
        path="/employee/*"
        element={
          <>
            <ProtectedRoute
              element={<HomeEmployee />}
              requiredRoles={["EMPLOYEE", "ADMIN"]}
            />
          </>
        }
      />
      <Route
        path="/employee/medicines"
        element={
          <ProtectedRoute
            element={<MedicineManager />}
            requiredRoles={["EMPLOYEE", "ADMIN"]}
          />
        }
      />
      <Route
        path="/employee/medicines/add"
        element={
          <ProtectedRoute
            element={<CreateMedicine />}
            requiredRoles={["EMPLOYEE", "ADMIN"]}
          />
        }
      />
      <Route
        path="/employee/medicines/:id/edit"
        element={
          <ProtectedRoute
            element={<UpdateMedicine />}
            requiredRoles={["EMPLOYEE", "ADMIN"]}
          />
        }
      />
      <Route
        path="/employee/medicines/:id"
        element={
          <ProtectedRoute
            element={<DetailMedicine />}
            requiredRoles={["EMPLOYEE", "ADMIN"]}
          />
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute element={<HomeAdmin />} requiredRoles={["ADMIN"]} />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
