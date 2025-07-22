// src/components/Hero.jsx
import React, { useEffect } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { FaUserTie, FaTree, FaHandsHelping, FaChevronDown } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

import heroImg1 from '../assets/images/hero.jpg';
import heroImg2 from '../assets/images/hero2.jpg';
import heroImg3 from '../assets/images/hero3.jpg';

import '../styles/Hero.css';

const slides = [
  {
    image: heroImg1,
    alt: 'Madres emprendedoras recibiendo capacitación',
    icon: FaUserTie,
    title: 'Madres Emprendedoras',
    description:
      'Capacitación y mentoría para las Madres cabeza de familia, brindando herramientas prácticas y acompañamiento personalizado que impulsa su autonomía y crecimiento.',
  },
  {
    image: heroImg2,
    alt: 'Familias celebrando Navidad',
    icon: FaTree,
    title: 'Navidad en Familia',
    description:
      'Encuentros navideños llenos de solidaridad y alegría, fortaleciendo vínculos familiares y creando memorias inolvidables para todos.',
  },
  {
    image: heroImg3,
    alt: 'Aliados estratégicos colaborando',
    icon: FaHandsHelping,
    title: 'Aliados Estratégicos',
    description:
      'Colaboración con Multi-Impresos S.A.S. y aliados clave, multiplicando nuestro impacto y materializando proyectos que transforman vidas.',
  }
];

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out', once: true });
  }, []);

  return (
    <Carousel
      fade
      controls
      indicators
      interval={6000}
      pause="hover"
      className="hero-carousel"
    >
      {slides.map((slide, idx) => {
        const Icon = slide.icon;
        return (
          <Carousel.Item key={idx} className="hero-slide">
            <img
              className="d-block w-100 hero-img"
              src={slide.image}
              alt={slide.alt}
              loading="lazy"
            />
            <div className="hero-overlay" />

            <Container className="hero-content text-white">
              <Row className="align-items-center">
                <Col lg={8}>
                  <div className="mb-3" data-aos="fade-down">
                    <Icon size={48} className="feature-icon" />
                  </div>
                  <h1 className="hero-title mb-3" data-aos="fade-down">
                    {slide.title}
                  </h1>
                  <p className="hero-lead mb-4" data-aos="fade-up" data-aos-delay="200">
                    {slide.description}
                  </p>
                  <Button
                    className="btn-accent btn-lg ripple"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    Únete a Nuestra Misión
                  </Button>
                </Col>
              </Row>

              <FaChevronDown
                className="scroll-indicator"
                size={32}
                data-aos="fade-up"
                data-aos-delay="600"
              />
            </Container>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Hero;
