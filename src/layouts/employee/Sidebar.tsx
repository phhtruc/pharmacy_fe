import React from "react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <Link to="/employee">
          <img src="/images_admin/logo.png" className="img-fluid" alt="" />
          <span>Pharmacy</span>
        </Link>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className={isActive("/employee/dashboard")}>
              <Link
                to="/employee/dashboard"
                className={`iq-waves-effect collapsed ${isActive(
                  "/employee/dashboard"
                )}`}
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-home-4-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={isActive("/employee/medicines")}>
              <Link
                to="/employee/medicines"
                className={`iq-waves-effect collapsed ${isActive(
                  "/employee/medicines"
                )}`}
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-mail-line"></i>
                <span>Medication management</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-3"></div>
      </div>
    </div>
  );
};

export default Sidebar;
