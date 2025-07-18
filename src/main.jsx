import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// // Import CSS
import './assets/fonts/icomoon/style.css';
import './assets/css/bootstrap.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/jquery-ui.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/style.css';

// // Import JavaScript
import './assets/js/jquery-3.3.1.min.js';
import './assets/js/jquery-ui.js';
import './assets/js/owl.carousel.min.js';
import './assets/js/jquery.magnific-popup.min.js';
//import './assets/js/main.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery-ui-dist/jquery-ui.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//import 'magnific-popup/dist/magnific-popup.css';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
