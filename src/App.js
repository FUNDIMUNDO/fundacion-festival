// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import CustomNavbar     from './components/CustomNavbar';
import ScrollToTop      from './components/ScrollToTop';
import Hero             from './components/Hero';
import AboutHome        from './components/AboutHome';
import QuienesSomos     from './components/QuienesSomos';
import EventosPage      from './pages/EventosPage';
import Contacto         from './components/Contacto';
import Login            from './components/Login';
import Register         from './components/Register';
import ProtectedRoute   from './components/ProtectedRoute';
import StickyBanner     from './components/StickyBanner';
import WhatsAppButton   from './components/WhatsAppButton';
import Footer           from './components/Footer';

// Importar estilos y componentes de react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <CustomNavbar />

        {/* ToastContainer para notificaciones */}
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<><Hero /><AboutHome /></>} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Eventos solo accesible si está autenticado */}
          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <EventosPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <StickyBanner />
        <Footer />
        <WhatsAppButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
