import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';

function PeriodoConfig() {
  const [periodos, setPeriodos] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [actualId, setActualId] = useState(null);

  const API_URL = 'http://localhost:4000'; // Cambia si usas proxy o variable de entorno

  useEffect(() => {
    cargarPeriodos();
  }, []);

  const cargarPeriodos = async () => {
    try {
      const res = await fetch(`${API_URL}/periodos`);
      const data = await res.json();
      setPeriodos(data);
      const actual = data.find(p => p.actual);
      if (actual) {
        setActualId(actual.id);
        localStorage.setItem('periodoActual', actual.id); // 👈 útil para otras vistas
      }
    } catch (err) {
      console.error('Error al cargar periodos:', err);
    }
  };

  const agregar = async () => {
    if (!nuevoNombre.trim()) return;
    try {
      const res = await fetch(`${API_URL}/periodos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre })
      });
      const nuevo = await res.json();
      setPeriodos([...periodos, nuevo]);
      setNuevoNombre('');
    } catch (err) {
      console.error('Error al crear periodo:', err);
    }
  };

  const seleccionar = async (id) => {
    try {
      await fetch(`${API_URL}/periodos/${id}/actual`, { method: 'PATCH' });
      setActualId(id);
      localStorage.setItem('periodoActual', id);
      alert(`📅 Periodo activo actualizado`);
      window.location.reload();
    } catch (err) {
      console.error('Error al actualizar periodo actual:', err);
    }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`${API_URL}/periodos/${id}`, { method: 'DELETE' });
      const actualizados = periodos.filter(p => p.id !== id);
      setPeriodos(actualizados);
      if (id === actualId && actualizados.length > 0) {
        seleccionar(actualizados[0].id);
      }
    } catch (err) {
      console.error('Error al eliminar periodo:', err);
    }
  };

  return (
    <div className="mt-4">
      <h4>Periodo Académico</h4>
      <Row className="g-2 align-items-end mb-3">
        <Col md={8}>
          <Form.Control
            placeholder="Ej. 2025-2"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button onClick={agregar} className="w-100">Agregar Periodo</Button>
        </Col>
      </Row>

      <ListGroup>
        {periodos.map((p) => (
          <ListGroup.Item
            key={p.id}
            className="d-flex justify-content-between align-items-center"
            style={{ background: p.id === Number(actualId) ? '#e6f0ff' : 'white' }}
          >
            <div>
              {p.id === Number(actualId) && <strong>✔ </strong>}
              {p.nombre}
            </div>
            <div>
              <Button
                size="sm"
                variant="outline-primary"
                className="me-2"
                onClick={() => seleccionar(p.id)}
              >
                Usar
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => eliminar(p.id)}
              >
                Eliminar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default PeriodoConfig;
