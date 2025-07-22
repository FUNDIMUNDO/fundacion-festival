// src/components/AboutHome.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutHome = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section
      id="about-home"
      className="py-5 bg-light"
      data-aos="fade-up"
    >
      <Container>
        <h2
          className="text-center fw-bold mb-4"
          data-aos="fade-down"
        >
          Nuestra Labor
        </h2>

        <Row className="g-4">
          <Col
            md={4}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Card className="h-100 border-0 shadow-sm card-hover">
              <Card.Body>
                <Card.Title as="h3" className="fs-5">Emprendimiento para madres</Card.Title>
                <Card.Text>
                  Impulsamos a madres cabeza de familia, brindándoles capacitación, mentoría y herramientas
                  para que desarrollen y consoliden sus propios emprendimientos con autonomía y confianza.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            md={4}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Card className="h-100 border-0 shadow-sm card-hover">
              <Card.Body>
                <Card.Title as="h3" className="fs-5">Integración Navideña</Card.Title>
                <Card.Text>
                  Cada Navidad organizamos encuentros y actividades que fortalecen los lazos familiares,
                  celebrando juntos la solidaridad, la alegría y el espíritu festivo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            md={4}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Card className="h-100 border-0 shadow-sm card-hover">
              <Card.Body>
                <Card.Title as="h3" className="fs-5">Aliados Estratégicos</Card.Title>
                <Card.Text>
                  Contamos con el respaldo de tres empresas comprometidas con nuestra misión, 
                  entre ellas <strong>Multi-Impresos S.A.S. de Bogotá</strong>, que aportan recursos  
                  y experiencia para maximizar nuestro impacto.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutHome;
