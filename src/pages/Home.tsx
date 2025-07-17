import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="site-wrap">
      <div
        className="site-blocks-cover"
        style={{ backgroundImage: "url('images/hero_1.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
              <div className="site-block-cover-content text-center">
                <h2 className="sub-title">
                  Effective Medicine, New Medicine Everyday
                </h2>
                <h1>Welcome To Pharma</h1>
                <p>
                  <Link to="/shop" className="btn btn-primary px-5 py-3">
                    Shop Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="site-section">
        <div className="container">
          <div className="row align-items-stretch section-overlap">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap bg-primary h-100">
                <Link to="#" className="h-100">
                  <h5>
                    Free <br /> Shipping
                  </h5>
                  <p>
                    Amet sit amet dolor
                    <strong>
                      Lorem, ipsum dolor sit amet consectetur adipisicing.
                    </strong>
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap h-100">
                <Link to="#" className="h-100">
                  <h5>
                    Season <br /> Sale 50% Off
                  </h5>
                  <p>
                    Amet sit amet dolor
                    <strong>
                      Lorem, ipsum dolor sit amet consectetur adipisicing.
                    </strong>
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap bg-warning h-100">
                <Link to="#" className="h-100">
                  <h5>
                    Buy <br /> A Gift Card
                  </h5>
                  <p>
                    Amet sit amet dolor
                    <strong>
                      Lorem, ipsum dolor sit amet consectetur adipisicing.
                    </strong>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Popular Products</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <span className="tag">Sale</span>
              <Link to="shop-single.html">
                <img src="images/product_01.png" alt="Bioderma" />
              </Link>
              <h3 className="text-dark">
                <Link to="shop-single.html">Bioderma</Link>
              </h3>
              <p className="price">
                <del>$95.00</del> &mdash; $55.00
              </p>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <Link to="shop-single.html">
                <img src="images/product_02.png" alt="Chanca Piedra" />
              </Link>
              <h3 className="text-dark">
                <Link to="shop-single.html">Chanca Piedra</Link>
              </h3>
              <p className="price">$70.00</p>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <Link to="shop-single.html">
                <img src="images/product_03.png" alt="Umcka Cold Care" />
              </Link>
              <h3 className="text-dark">
                <Link to="shop-single.html">Umcka Cold Care</Link>
              </h3>
              <p className="price">$120.00</p>
            </div>

            {/* ... (các sản phẩm khác giống trên, chỉ cần copy theo mẫu này) */}
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link to="shop.html" className="btn btn-primary px-4 py-3">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Testimonials</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 block-3 products-wrap">
              <div className="nonloop-block-3 no-direction owl-carousel">
                <div className="testimony">
                  <blockquote>
                    <img
                      src="images/person_1.jpg"
                      alt="Kelly Holmes"
                      className="img-fluid w-25 mb-4 rounded-circle"
                    />
                    <p>
                      &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit...&rdquo;
                    </p>
                  </blockquote>
                  <p>&mdash; Kelly Holmes</p>
                </div>

                {/* Thêm các testimony khác giống trên */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners with background images */}
      <div
        className="site-section bg-secondary bg-image"
        style={{ backgroundImage: "url('images/bg_2.jpg')" }}
      >
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a
                href="#"
                className="banner-1 h-100 d-flex"
                style={{ backgroundImage: "url('images/bg_1.jpg')" }}
              >
                <div className="banner-1-inner align-self-center">
                  <h2>Pharma Products</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </a>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <a
                href="#"
                className="banner-1 h-100 d-flex"
                style={{ backgroundImage: "url('images/bg_2.jpg')" }}
              >
                <div className="banner-1-inner ml-auto align-self-center">
                  <h2>Rated by Experts</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
