// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import {
  Form,
  Button,
  Alert,
  Spinner,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';
import googleLogo from '../assets/logos/google-logo.webp=s48-fcrop64=1,00000000ffffffff-rw';
import '../styles/Login.css';

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
    } catch {
      setError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/eventos');
    } catch {
      setError('Error al iniciar con Google');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5 login-page">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Iniciar sesión</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="login-form">
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

          {/* Enlace a registro */}
          <p className="text-center mt-2">
            ¿No tienes cuenta?{' '}
            <Link to="/register">
              <strong>Regístrate aquí</strong>
            </Link>
          </p>

          <div className="divider">o</div>

          <Button
            variant="light"
            onClick={handleGoogle}
            disabled={loading}
            className="w-100 btn-google"
            aria-label="Continuar con Google"
          >
            {loading 
              ? <Spinner animation="border" size="sm" /> 
              : (
                <>
                  <img src={googleLogo} alt="Google logo" className="google-logo" />
                  <span>Continuar con Google</span>
                </>
              )
            }
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
