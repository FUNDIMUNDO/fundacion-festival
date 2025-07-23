// src/components/QuienesSomos.jsx
import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Accordion,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap';
import {
  FaBullseye,
  FaEye,
  FaHandshake
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import fundacionImg from '../assets/images/QuienesSomos.png';
import '../styles/QuienesSomos.css';  // asegúrate de tener aquí las reglas para .mvv-section, .mvv-overlay y .mvv-content

const QuienesSomos = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const valoresInfo = {
    Inclusión: 'Fomentamos la participación de todas las personas sin discriminación.',
    Colaboración: 'Trabajamos conjuntamente con comunidades y aliados.',
    Creatividad: 'Impulsamos soluciones artísticas e innovadoras.',
    Sostenibilidad: 'Promovemos prácticas que cuidan nuestro entorno.'
  };
  const iconColor = 'var(--color-logo-purple)';

  return (
    <section id="mvv" className="mvv-section">
      {/* overlay semitransparente */}
      <div className="mvv-overlay" />

      {/* contenido en primer plano */}
      <Container className="mvv-content py-5">
        {/* Encabezado con imagen y descripción */}
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0" data-aos="fade-left">
            <Image
              src={fundacionImg}
              alt="Equipo de la fundación"
              fluid
              rounded
            />
          </Col>
          <Col md={6} data-aos="fade-right">
            <h2 className="fw-bold mb-3">¿Quiénes Somos?</h2>
            <p>
              FUNDIMUNDO es una fundación comprometida con el fortalecimiento de las expresiones culturales y el 
              apoyo al emprendimiento de madres cabeza de familia. Cada temporada navideña, 
              organizamos en Bogotá un festival que reúne a representantes de los 32 departamentos de Colombia,
              con el propósito de promover la unión familiar, difundir nuestras tradiciones y 
              generar oportunidades económicas para estas mujeres.
            </p>
            <p>
              Nuestro equipo multidisciplinar trabaja de la mano con artistas, líderes comunitarios y voluntarios para
              crear experiencias inclusivas, accesibles y sostenibles, llevando alegría y aprendizaje a cada rincón
              del país.
            </p>
            <p className="text-muted small">
              *Contenido provisional: historia oficial en desarrollo.
            </p>
          </Col>
        </Row>

        {/* Misión, Visión y Valores */}
        <h3 className="text-center mt-5 mb-4" data-aos="zoom-in">
          Misión, Visión y Valores
        </h3>

        {/* Desktop */}
        <Row className="g-4 d-none d-md-flex">
          <Col md={4} data-aos="fade-up" data-aos-delay="100">
            <Card className="h-100 shadow-sm border-0 card-hover">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3" style={{ color: iconColor }}>
                  <FaBullseye size={32} />
                </div>
                <Card.Title>Misión</Card.Title>
                <Card.Text className="flex-grow-1">
                  En la Fundación Festival para Colombia y el Mundo tenemos el firme propósito de
                  unir a todos los departamentos del país en un gran encuentro cultural en Bogotá,
                  donde cada región haga valer sus tradiciones y expresiones más emblemáticas. 
                  A través de la celebración navideña, buscamos reavivar el calor humano y los lazos familiares, 
                  al tiempo que impulsamos nuevos talentos para que desarrollen y compartan sus virtudes. 
                  Para ello, integramos de manera colaborativa a empresas del sector público y privado, 
                  creando sinergias que fortalecen el tejido social y cultural de Colombia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 shadow-sm border-0 card-hover">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3" style={{ color: iconColor }}>
                  <FaEye size={32} />
                </div>
                <Card.Title>Visión</Card.Title>
                <Card.Text className="flex-grow-1">
                  Para el año 2030, seremos una fundación líder y reconocida, tanto a nivel nacional como internacional,
                  por nuestro festival navideño que celebra las expresiones culturales más icónicas de cada
                  departamento de Colombia. Integraremos avances tecnológicos de vanguardia y empoderaremos a las
                  comunidades más vulnerables mediante el impulso de emprendimientos sociales, fortaleciendo así la
                  cohesión familiar y el desarrollo humano.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} data-aos="fade-up" data-aos-delay="300">
            <Card className="h-100 shadow-sm border-0 card-hover">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3" style={{ color: iconColor }}>
                  <FaHandshake size={32} />
                </div>
                <Card.Title>Valores</Card.Title>
                <ListGroup variant="flush" className="mt-2 flex-grow-1">
                  {['Inclusión', 'Colaboración', 'Creatividad', 'Sostenibilidad'].map(valor => (
                    <OverlayTrigger
                      key={valor}
                      placement="top"
                      overlay={<Tooltip id={`tooltip-${valor}`}>{valoresInfo[valor]}</Tooltip>}
                    >
                      <ListGroup.Item>{valor}</ListGroup.Item>
                    </OverlayTrigger>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mobile */}
        <Accordion className="d-md-none" defaultActiveKey="">
          {['Misión', 'Visión', 'Valores'].map((section, idx) => (
            <Accordion.Item eventKey={`${idx}`} key={section}>
              <Accordion.Header>{section}</Accordion.Header>
              <Accordion.Body>
                {section !== 'Valores' ? (
                  section === 'Misión' ? (
                    'Conectar a las comunidades a través de eventos culturales que promuevan la inclusión, el respeto por la diversidad y el desarrollo del talento local.'
                  ) : (
                    'Ser reconocidos en toda América Latina como un referente en promoción cultural y desarrollo comunitario, inspirando a nuevas generaciones a valorar y preservar nuestras tradiciones.'
                  )
                ) : (
                  <ListGroup variant="flush">
                    {['Inclusión', 'Colaboración', 'Creatividad', 'Sostenibilidad'].map(valor => (
                      <OverlayTrigger
                        key={valor}
                        placement="top"
                        overlay={<Tooltip id={`tooltip-mobile-${valor}`}>{valoresInfo[valor]}</Tooltip>}
                      >
                        <ListGroup.Item>{valor}</ListGroup.Item>
                      </OverlayTrigger>
                    ))}
                  </ListGroup>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="text-center mt-5">
          <Button className="btn-accent ripple px-4 py-2">
            Únete a Nuestra Misión
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default QuienesSomos;
