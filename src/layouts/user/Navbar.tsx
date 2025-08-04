import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="site-navbar py-2">
      <div className="search-wrap">
        <div className="container">
          <Link
            to="#"
            className="search-close js-search-close"
            onClick={(e) => e.preventDefault()}
          >
            <span className="icon-close2"></span>
          </Link>
          <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="form-control"
              placeholder="Search keyword and hit enter..."
            />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <Link to="/" className="js-logo-clone">
                Pharma
              </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav
              className="site-navigation text-right text-md-center"
              role="navigation"
            >
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li className="active">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Store</Link>
                </li>
                <li className="has-children">
                  <button
                    className="btn btn-link"
                    style={{ textDecoration: "none", color: "#25262a" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Dropdown
                  </button>
                  <ul className="dropdown">
                    <li>
                      <button
                        className="btn btn-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        Supplements
                      </button>
                    </li>
                    <li className="has-children">
                      <button
                        className="btn btn-link"
                        style={{ textDecoration: "none", color: "#25262a" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        Vitamins
                      </button>
                      <ul className="dropdown">
                        <li>
                          <button
                            className="btn btn-link"
                            style={{ textDecoration: "none", color: "#25262a" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            Supplements
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn btn-link"
                            style={{ textDecoration: "none", color: "#25262a" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            Nutrition
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn btn-link"
                            style={{ textDecoration: "none", color: "#25262a" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            Coffee
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button
                        className="btn btn-link"
                        style={{ textDecoration: "none", color: "#25262a" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        Nutrition
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-link"
                        style={{ textDecoration: "none", color: "#25262a" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        Coffee
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="icons">
            <button
              className="icons-btn d-inline-block js-search-open btn btn-link"
              style={{ textDecoration: "none" }}
              onClick={(e) => e.preventDefault()}
            >
              <span className="icon-search"></span>
            </button>
            <Link to="/cart" className="icons-btn d-inline-block bag">
              <span className="icon-shopping-bag"></span>
              <span className="number">2</span>
            </Link>
          </div>
          <div className="user-menu">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icon-person"></i> Xin chào,{" "}
                  {user.username || user.fullName}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Hồ sơ cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/login" className="btn btn-primary me-2">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-outline-primary">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;