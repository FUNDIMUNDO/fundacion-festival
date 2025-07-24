// src/components/Register.jsx
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup
} from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PASSWORD_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';

function generatePassword(length = 12) {
  let pwd = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    pwd += PASSWORD_ALPHABET[array[i] % PASSWORD_ALPHABET.length];
  }
  return pwd;
}

export default function Register() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();
  const auth     = getAuth();

  const handleGenerate = () => {
    const pwd = generatePassword(16);
    setPassword(pwd);
    navigator.clipboard.writeText(pwd);
    toast.info('Contraseña generada y copiada al portapapeles');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Guardar perfil básico en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid:       user.uid,
        email:     user.email,
        createdAt: serverTimestamp(),
        role:      'user'
      });
      toast.success('Cuenta creada correctamente');
      navigate('/eventos');
    } catch (err) {
      console.error(err);
      setError(err.message.includes('auth/') 
        ? 'No se pudo crear la cuenta. Revisa los datos.' 
        : err.message);
    }
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Regístrate</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Genera o ingresa tu contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleGenerate}
                  disabled={loading}
                  aria-label="Generar contraseña"
                >
                  Generar
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                Haz clic en “Generar” para obtener una contraseña segura.
              </Form.Text>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="w-100"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Registrarse'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
