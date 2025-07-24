// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import {
  Form,
  Button,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Divider
} from 'react-bootstrap';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const { signInWithGoogle } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/eventos');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      // si usas el método del contexto:
      await signInWithGoogle();
      navigate('/eventos');
    } catch (err) {
      console.error(err);
      setError('Error al iniciar con Google');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Iniciar sesión</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* Formulario Email/Password */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="admin@..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="w-100 mb-3"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Entrar'}
            </Button>
          </Form>

          {/* Divider */}
          <div className="text-center my-3">o</div>

          {/* Botón Google Sign-In */}
          <Button
            variant="outline-danger"
            onClick={handleGoogle}
            disabled={loading}
            className="w-100 d-flex align-items-center justify-content-center"
            aria-label="Continuar con Google"
          >
            {loading ? (
              <Spinner animation="border" size="sm" className="me-2" />
            ) : (
              <img
                src="/logos/google-logo.png"
                alt="Google logo"
                style={{ width: 20, marginRight: 8 }}
              />
            )}
            {loading ? 'Cargando...' : 'Continuar con Google'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
