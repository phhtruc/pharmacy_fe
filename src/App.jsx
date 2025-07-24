import React from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ['/login', '/register'];

  return (
    <>
      {/* Hiển thị Navbar nếu không nằm trong các đường dẫn cần ẩn */}
      {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
      <AppRoutes />
      {/* Hiển thị Footer nếu không nằm trong các đường dẫn cần ẩn */}
      {!hideNavbarFooter.includes(location.pathname) && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;