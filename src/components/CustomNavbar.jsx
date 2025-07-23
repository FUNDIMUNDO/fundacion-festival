// src/components/CustomNavbar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logos/logo.png';
import '../styles/CustomNavbar.css';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';
import DonationButton from './DonationButton';

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
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
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos">Sobre Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/eventos">Eventos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>

            {!user ? (
              <Nav.Link
                as={Link}
                to="/login"
                className="d-flex align-items-center"
                aria-label="Iniciar sesión"
              >
                <FaSignInAlt className="me-2" aria-hidden="true" />
                Iniciar Sesión
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={handleLogout}
                className="d-flex align-items-center"
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt className="me-2" aria-hidden="true" />
                Cerrar Sesión
              </Nav.Link>
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
