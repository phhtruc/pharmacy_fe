import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

// // Import CSS
import "./assets/fonts/icomoon/style.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/style.css";

// // Import JavaScript
import "./assets/js/jquery-3.3.1.min.js";
import "./assets/js/jquery-ui.js";
import "./assets/js/owl.carousel.min.js";
import "./assets/js/jquery.magnific-popup.min.js";
//import './assets/js/main.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery-ui-dist/jquery-ui.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
//import 'magnific-popup/dist/magnific-popup.css';

// Import CSS files Admin
import "./assets/admin/images/favicon.ico";
import "./assets/admin/css/bootstrap.min.css";
import "./assets/admin/css/typography.css";
import "./assets/admin/css/style.css";
import "./assets/admin/css/responsive.css";
import "./assets/admin/js/jquery.min.js";
// import './assets/admin/js/popper.min.js'
import "./assets/admin/js/bootstrap.min.js";
import "./assets/admin/js/jquery.appear.js";
import "./assets/admin/js/countdown.min.js";
// import './assets/admin/js/waypoints.min.js'
import "./assets/admin/js/jquery.counterup.min.js";
// import './assets/admin/js/wow.min.js'
import "./assets/admin/js/apexcharts.js";
import "./assets/admin/js/slick.min.js";
import "./assets/admin/js/select2.min.js";
import "./assets/admin/js/owl.carousel.min.js";
import "./assets/admin/js/jquery.magnific-popup.min.js";
import "./assets/admin/js/smooth-scrollbar.js";
import "./assets/admin/js/lottie.js";
import "./assets/admin/js/chart-custom.js";
import "./assets/admin/js/custom.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
