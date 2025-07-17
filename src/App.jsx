import React from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
