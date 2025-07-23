// src/components/Contacto.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Spinner,
  Alert
} from 'react-bootstrap';
import { FaUser, FaEnvelope, FaComment, FaPhone } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Contacto.css';

const Contacto = () => {
  // Estado del formulario
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Inicializar AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Validación simple
  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es requerido';
    if (!/\S+@\S+\.\S+/.test(form.correo)) errs.correo = 'Correo inválido';
    if (!form.mensaje.trim()) errs.mensaje = 'El mensaje no puede estar vacío';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simula envío
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ nombre: '', correo: '', mensaje: '' });
    }, 1000);
  };

  return (
    <section id="contacto" className="bg-light py-5">
      <Container>
        <h2 className="mb-2 text-center" data-aos="fade-up">
          Contáctanos
        </h2>
        <p
          className="text-center text-muted mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Escríbenos tus dudas o sugerencias y te responderemos pronto.
        </p>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="contact-card" data-aos="fade-up" data-aos-delay="200">
              <Card.Body>
                {success && (
                  <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                    ¡Gracias por tu mensaje! Pronto nos pondremos en contacto.
                  </Alert>
                )}
                <Form noValidate onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text><FaUser /></InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        isInvalid={!!errors.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Correo */}
                  <Form.Group className="mb-3" controlId="formCorreo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="correo"
                        placeholder="nombre@ejemplo.com"
                        value={form.correo}
                        onChange={handleChange}
                        isInvalid={!!errors.correo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.correo}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Mensaje */}
                  <Form.Group className="mb-4" controlId="formMensaje">
                    <Form.Label>Mensaje</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text><FaComment /></InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        value={form.mensaje}
                        onChange={handleChange}
                        isInvalid={!!errors.mensaje}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mensaje}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Botón */}
                  <div className="text-center">
                    <Button type="submit" className="btn-contact" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{' '}
                          Enviando...
                        </>
                      ) : (
                        'Enviar mensaje'
                      )}
                    </Button>
                  </div>

                  {/* Contacto alternativo */}
                  <div className="mt-4 text-center">
                    <p className="mb-1">Si el formulario o el botón de Whatsapp no funciona, contáctanos a:</p>
                    <p className="mb-1">
                      <FaPhone className="me-2 text-primary" />
                      +57 300 6207693
                    </p>
                    <p>
                      <FaEnvelope className="me-2 text-secondary" />
                      infofundimundo@gmail.com
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contacto;
