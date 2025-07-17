import React from "react";
import { Link } from "react-router-dom";

const Shop = () => {
    return (
        <div className="site-wrap">
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><Link to="index.html">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Store</strong></div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                            <div id="slider-range" className="border-primary"></div>
                            <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled={true} />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Reference</h3>
                            <button type="button" className="btn btn-secondary btn-md dropdown-toggle px-4" id="dropdownMenuReference"
                                data-toggle="dropdown">Reference</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                <a className="dropdown-item" href="#">Relevance</a>
                                <a className="dropdown-item" href="#">Name, A to Z</a>
                                <a className="dropdown-item" href="#">Name, Z to A</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Price, low to high</a>
                                <a className="dropdown-item" href="#">Price, high to low</a>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <span className="tag">Sale</span>
                            <Link to="shop-single.html"> <img src="images/product_01.png" alt="Image"/></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Bioderma</Link></h3>
                            <p className="price"><del>95.00</del> &mdash; $55.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_02.png" alt="Image"/></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Chanca Piedra</Link></h3>
                            <p className="price">$70.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_03.png" alt="Image"/></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Umcka Cold Care</Link></h3>
                            <p className="price">$120.00</p>
                        </div>

                        <div className="col-sm-6 col-lg-4 text-center item mb-4">

                            <Link to="shop-single.html"> <img src="images/product_04.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Cetyl Pure</Link></h3>
                            <p className="price"><del>45.00</del> &mdash; $20.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_05.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">CLA Core</Link></h3>
                            <p className="price">$38.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <span className="tag">Sale</span>
                            <Link to="shop-single.html"> <img src="images/product_06.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Poo Pourri</Link></h3>
                            <p className="price"><del>$89</del> &mdash; $38.00</p>
                        </div>

                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <span className="tag">Sale</span>
                            <Link to="shop-single.html"> <img src="images/product_01.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Bioderma</Link></h3>
                            <p className="price"><del>95.00</del> &mdash; $55.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_02.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Chanca Piedra</Link></h3>
                            <p className="price">$70.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_03.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Umcka Cold Care</Link></h3>
                            <p className="price">$120.00</p>
                        </div>

                        <div className="col-sm-6 col-lg-4 text-center item mb-4">

                            <Link to="shop-single.html"> <img src="images/product_04.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Cetyl Pure</Link></h3>
                            <p className="price"><del>45.00</del> &mdash; $20.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <Link to="shop-single.html"> <img src="images/product_05.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">CLA Core</Link></h3>
                            <p className="price">$38.00</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 text-center item mb-4">
                            <span className="tag">Sale</span>
                            <Link to="shop-single.html"> <img src="images/product_06.png" alt="Image" /></Link>
                            <h3 className="text-dark"><Link to="shop-single.html">Poo Pourri</Link></h3>
                            <p className="price"><del>$89</del> &mdash; $38.00</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <div className="site-block-27">
                                <ul>
                                    <li><Link to="#">&lt;</Link></li>
                                    <li className="active"><span>1</span></li>
                                    <li><Link to="#">2</Link></li>
                                    <li><Link to="#">3</Link></li>
                                    <li><Link to="#">4</Link></li>
                                    <li><Link to="#">5</Link></li>
                                    <li><Link to="#">&gt;</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section bg-secondary bg-image" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
                <div className="container">
                    <div className="row align-items-stretch">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <Link to="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_1.jpg')" }}>
                                <div className="banner-1-inner align-self-center">
                                    <h2>Pharma Products</h2>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <Link to="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
                                <div className="banner-1-inner ml-auto  align-self-center">
                                    <h2>Rated by Experts</h2>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
