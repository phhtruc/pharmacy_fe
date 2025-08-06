import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <Link to="/admin">
          <img src="/images_admin/logo.png" className="img-fluid" alt="" />
          <span>Pharmacy</span>
        </Link>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className={isActive("/admin")}>
              <a
                href="#dashboard"
                className="iq-waves-effect collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-home-4-line"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className={isActive("/admin/users")}>
              <a
                href="#mailbox"
                className="iq-waves-effect collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-mail-line"></i>
                <span>Quản lý tài khoản</span>
              </a>
            </li>
          </ul>
          <div className="flex-grow-1"></div>
          <ul className="iq-menu mt-auto">
            <li className={isActive("/employee")}>
              <Link
                to="/employee"
                className={`iq-waves-effect ${isActive("/employee")}`}
              >
                <i className="ri-dashboard-line"></i>
                <span>Employee Page</span>
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
