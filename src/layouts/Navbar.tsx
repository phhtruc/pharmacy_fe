import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout, getDecodedToken } from "../utils/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      const decodedToken = getDecodedToken();
      if (decodedToken && decodedToken.sub) {
        setUsername(decodedToken.sub);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onLogout = () => {
    handleLogout();
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <div className="site-navbar py-2">
      <div className="search-wrap">
        <div className="container">
          <Link to="#" className="search-close js-search-close">
            <span className="icon-close2"></span>
          </Link>
          <form action="#" method="post">
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
              <Link to="index.html" className="js-logo-clone">
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
                  <Link to="#">Dropdown</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="#">Supplements</Link>
                    </li>
                    <li className="has-children">
                      <Link to="#">Vitamins</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="#">Supplements</Link>
                        </li>
                        <li>
                          <Link to="#">Vitamins</Link>
                        </li>
                        <li>
                          <Link to="#">Diet &amp; Nutrition</Link>
                        </li>
                        <li>
                          <Link to="#">Tea &amp; Coffee</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">Diet &amp; Nutrition</Link>
                    </li>
                    <li>
                      <Link to="#">Tea &amp; Coffee</Link>
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
            <Link to="#" className="icons-btn d-inline-block js-search-open">
              <span className="icon-search"></span>
            </Link>
            <Link to="cart.html" className="icons-btn d-inline-block bag">
              <span className="icon-shopping-bag"></span>
              <span className="number">2</span>
            </Link>
            <a
              href="#"
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu"></span>
            </a>
          </div>
          <div className="user-menu">
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icon-person"></i> Xin chào, {username}
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
                    <button className="dropdown-item" onClick={onLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
