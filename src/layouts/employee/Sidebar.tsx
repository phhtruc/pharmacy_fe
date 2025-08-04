import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <a href="index.html">
          <img src="/images_admin/logo.png" className="img-fluid" alt="" />
          <span>Sofbox</span>
        </a>
        <div className="iq-menu-bt align-self-center">
          <div className="wrapper-menu">
            <div
              className="line-menu half s
            tart"
            ></div>
            <div className="line-menu"></div>
            <div className="line-menu half end"></div>
          </div>
        </div>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="iq-menu-title">
              <i className="ri-separator"></i>
              <span>Main</span>
            </li>
            <li className="active">
              <a
                href="#dashboard"
                className="iq-waves-effect collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-home-4-line"></i>
                <span>Dashboard</span>
                <i className="ri-arrow-right-s-line iq-arrow-right"></i>
              </a>
              <ul
                id="dashboard"
                className="iq-submenu collapse"
                data-parent="#iq-sidebar-toggle"
              >
                <li className="active">
                  <a href="index.html">Dashboard 1</a>
                </li>
                <li>
                  <a href="dashboard1.html">Dashboard 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#mailbox"
                className="iq-waves-effect collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="ri-mail-line"></i>
                <span>Quản lý thuốc</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-3"></div>
      </div>
    </div>
  );
};

export default Sidebar;
