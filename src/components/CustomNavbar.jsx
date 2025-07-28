// src/components/CustomNavbar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '../assets/logos/logo.png';
import defaultAvatar from '../assets/logos/default-avatar.png';
import '../styles/CustomNavbar.css';
import { AuthContext } from '../contexts/AuthContext';
import DonationButton from './DonationButton';

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Has cerrado sesión');
      navigate('/');
    } catch {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className={`navbar-custom${scrolled ? ' navbar-scrolled' : ''}`}
      style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
    >
      <Container>
        {/* Brand + logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center text-decoration-none text-dark"
        >
          <img
            src={logo}
            alt="Logo FUNDIMUNDO"
            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
            className="navbar-logo me-3"
          />
          <span className="fw-bold fs-4">FUNDIMUNDO</span>
        </Navbar.Brand>

        {/* Toggle / Collapse */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Enlaces estáticos */}
            <Nav.Link as={Link} to="/" aria-label="Inicio">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos" aria-label="Sobre Nosotros">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/eventos" aria-label="Eventos">
              Eventos
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" aria-label="Contacto">
              Contacto
            </Nav.Link>

            {/* Link al Dashboard solo para admins */}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="ms-2" aria-label="Dashboard">
                Dashboard
              </Nav.Link>
            )}

            {/* Autenticación */}
            {!user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex align-items-center"
                  aria-label="Iniciar sesión"
                >
                  <FaSignInAlt className="me-2" aria-hidden="true" />
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="ms-2"
                  aria-label="Registrarse"
                >
                  Registrarse
                </Nav.Link>
              </>
            ) : (
              <>
                {/* Avatar y nombre */}
                <Nav.Item className="d-flex align-items-center me-3">
                  <Image
                    src={user.photoURL || defaultAvatar}
                    roundedCircle
                    alt={user.displayName}
                    title={user.displayName}
                    style={{ width: 32, height: 32 }}
                    className="me-2"
                  />
                  <span className="fw-medium">{user.displayName}</span>
                </Nav.Item>

                {/* Logout */}
                <Nav.Link
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                  aria-label="Cerrar sesión"
                >
                  <FaSignOutAlt className="me-2" aria-hidden="true" />
                  Cerrar Sesión
                </Nav.Link>
              </>
            )}

            {/* Botón de donaciones */}
            <DonationButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
