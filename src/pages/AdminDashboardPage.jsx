import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UsersChart from "../components/UsersChart";
import DonationsChart from "../components/DonationsChart";
import EventsChart from "../components/EventsChart";

export default function AdminDashboardPage() {
  const { isAdmin, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: 0, donations: 0, events: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const eventsSnap = await getDocs(collection(db, "events"));
        const donationsSnap = await getDocs(collection(db, "donations"));

        setStats({
          users: usersSnap.size,
          events: eventsSnap.size,
          donations: donationsSnap.size,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Si el AuthContext todavía está cargando, muestra spinner
  if (authLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Si ya cargó y el usuario no es admin
  if (!isAdmin) {
    return <p>No tienes acceso a esta página</p>;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Panel de Administración</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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
                <h2>{stats.donations}</h2>
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
        </>
      )}
    </Container>
  );
}
