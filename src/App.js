// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import CustomNavbar     from './components/CustomNavbar';
import ScrollToTop      from './components/ScrollToTop';
import Hero             from './components/Hero';
import AboutHome        from './components/AboutHome';
import QuienesSomos    from './components/QuienesSomos';
import EventosPage      from './pages/EventosPage';
import Contacto         from './components/Contacto';
import Login            from './components/Login';
import StickyBanner     from './components/StickyBanner';
import WhatsAppButton   from './components/WhatsAppButton';
import Footer           from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <CustomNavbar />

        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<><Hero /><AboutHome /></>} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />

          {/* Eventos siempre visible */}
          <Route path="/eventos" element={<EventosPage />} />
        </Routes>

        <StickyBanner />
        <Footer />
        <WhatsAppButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
