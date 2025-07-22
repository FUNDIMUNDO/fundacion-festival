// src/components/Eventos.jsx
import React, { useEffect, useState, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Badge, Button, Card, Col, Row, Container,
  Modal, Form, Spinner, Alert, ProgressBar
} from 'react-bootstrap';
import { BiCalendar } from 'react-icons/bi';
import {
  collection, getDocs,
  addDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/CRUDEventos.css';

// Estos valores los defines en .env (o directamente aquí en desarrollo)
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function Eventos() {
  const { isAdmin } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', fecha: '', descripcion: '' });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 100 });
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'events'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
                       .sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
      setEvents(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditEvent(null);
    setFormData({ titulo: '', fecha: '', descripcion: '' });
    setFile(null);
    setError('');
    setUploadProgress(0);
    setShowModal(true);
  };

  const openEdit = evt => {
    setEditEvent(evt);
    setFormData({ titulo: evt.titulo, fecha: evt.fecha, descripcion: evt.descripcion });
    setFile(null);
    setError('');
    setUploadProgress(0);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFile = e => setFile(e.target.files[0]);

  // Función para subir archivo a Cloudinary
  const uploadToCloudinary = async (file) => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form }
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleSave = async () => {
    const { titulo, fecha, descripcion } = formData;
    if (!titulo || !fecha || !descripcion) {
      setError('Completa título, fecha y descripción.');
      return;
    }
    setSaving(true);
    try {
      let imageURL = editEvent?.imagen || '';
      if (file) {
        // opcional: mostrar un progreso simulado
        setUploadProgress(10);
        imageURL = await uploadToCloudinary(file);
        setUploadProgress(100);
      }
      if (editEvent) {
        const refDoc = doc(db, 'events', editEvent.id);
        await updateDoc(refDoc, { titulo, fecha, descripcion, imagen: imageURL });
      } else {
        await addDoc(collection(db, 'events'), { titulo, fecha, descripcion, imagen: imageURL });
      }
      handleClose();
      fetchEvents();
    } catch (e) {
      console.error(e);
      setError('Error al guardar evento.');
    }
    setSaving(false);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar este evento?')) {
      await deleteDoc(doc(db, 'events', id));
      fetchEvents();
    }
  };

  return (
    <Container className="my-5 eventos-container">
      <Row className="mb-3 align-items-center eventos-header">
        <Col><h2>Próximos Eventos</h2></Col>
        {isAdmin && (
          <Col xs="auto">
            <Button className="btn-add-event" onClick={openAdd}>Agregar Evento</Button>
          </Col>
        )}
      </Row>

      {loading ? <div className="text-center"><Spinner animation="border"/></div> : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map((evt,i) => (
            <Col key={evt.id} data-aos="fade-up" data-aos-delay={i*100}>
              <Card className="event-card h-100 d-flex flex-column" tabIndex={0}>
                {evt.imagen && <Card.Img src={evt.imagen} alt={evt.titulo} loading="lazy"/>}
                <Card.Body className="d-flex flex-column">
                  <Badge className="badge-date mb-2 align-self-start">
                    <BiCalendar className="me-1"/>
                    {new Date(evt.fecha).toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric' })}
                  </Badge>
                  <Card.Title>{evt.titulo}</Card.Title>
                  <Card.Text className="flex-grow-1 text-secondary">{evt.descripcion}</Card.Text>
                  <Button variant="outline-primary" className="mt-2">Más info</Button>
                  {isAdmin && (
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" className="btn-action btn-action-edit" onClick={()=>openEdit(evt)}>Editar</Button>
                      <Button size="sm" className="btn-action btn-action-delete" onClick={()=>handleDelete(evt.id)}>Eliminar</Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editEvent? 'Editar Evento':'Nuevo Evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen (archivo)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFile} />
            </Form.Group>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mb-3" />
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={saving}>Cancelar</Button>
          <Button className="btn-add-event" onClick={handleSave} disabled={saving}>
            {saving? <Spinner animation="border" size="sm"/>:'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
