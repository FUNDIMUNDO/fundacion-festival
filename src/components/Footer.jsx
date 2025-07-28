// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">FUNDIMUNDO</h5>
            <p className="small">Fundación Festival para Colombia y el Mundo</p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6>Enlaces</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">Inicio</Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-light text-decoration-none">Sobre Nosotros</Link>
              </li>
              <li>
                <Link to="/eventos" className="text-light text-decoration-none">Eventos</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-light text-decoration-none">Contacto</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6>Contacto</h6>
            <p className="mb-1">
              <FaEnvelope className="me-2 text-secondary" />
              infofundimundo@gmail.com
            </p>
            <p className="mb-1">
              <FaPhone className="me-2 text-primary" />
              +57 123 456 7890
            </p>
            <p className="mb-1">
              <FaWhatsapp className="me-2 text-success" />
              <a
                href="https://wa.me/573006207693"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                WhatsApp
              </a>
            </p>
            <div className="d-flex gap-3 mt-2">
              <a
                href="https://instagram.com/fundimundo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-light fs-4"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com/@tu_perfil"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-light fs-4"
              >
                <SiTiktok />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-3" />

        <p className="text-center small mb-0">
          © {new Date().getFullYear()} FUNDIMUNDO. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
