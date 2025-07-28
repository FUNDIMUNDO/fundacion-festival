// src/pages/AdminDashboardPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UsersChart from "../components/UsersChart";
import EventsChart from "../components/EventsChart";
import DonationsChart from "../components/DonationsChart";

export default function AdminDashboardPage() {
  const { isAdmin, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: 0, events: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setStatsLoading(true);
      try {
        const [usersSnap, eventsSnap] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "events")),
        ]);
        setStats({
          users: usersSnap.size,
          events: eventsSnap.size,
        });
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Mostrar spinner hasta que cargue auth y stats
  if (authLoading || statsLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Si no es admin
  if (!isAdmin) {
    return <p className="text-center my-5">No tienes acceso a esta página</p>;
  }

  // Valor hipotético de donaciones (sumatoria de sampleData)
  const hypotheticalDonations = 3520;

  return (
    <Container className="my-4">
      <h2 className="mb-4">Panel de Administración</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Usuarios Registrados</h5>
            <h2>{stats.users}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Eventos Activos</h5>
            <h2>{stats.events}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Total Donaciones</h5>
            <h2>{hypotheticalDonations}</h2>
            <small className="text-muted">Valores hipotéticos</small>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <UsersChart />
        </Col>
        <Col md={4}>
          <EventsChart />
        </Col>
        <Col md={4}>
          <DonationsChart />
        </Col>
      </Row>
    </Container>
  );
}
