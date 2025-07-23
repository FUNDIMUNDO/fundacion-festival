// src/components/DonationButton.jsx
import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

export default function DonationButton() {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      return toast.error('Introduce un monto válido');
    }
    try {
      await addDoc(
        collection(db, 'donations'),
        {
          userId: user.uid,
          amount: Number(amount),
          currency: 'COP',
          createdAt: serverTimestamp(),
          providerId: 'pending'
        }
      );
      toast.success('¡Donación registrada!');
      setShow(false);
      setAmount('');
    } catch (e) {
         console.error('Error al registrar la donación →', e);
         // Muestra el código y mensaje en el toast
         toast.error(`Error al registrar la donación (${e.code}): ${e.message}`);     
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)}>
        Dona Ahora
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Donar a Fundimundo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!user ? (
            <p className="text-danger">Debes iniciar sesión para donar.</p>
          ) : (
            <Form>
              <Form.Group controlId="donationAmount">
                <Form.Label>Monto (COP)</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Ej. 5000"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDonate} disabled={!user}>
            Donar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
