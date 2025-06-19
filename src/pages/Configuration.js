import React, { useEffect, useState } from 'react';
import {
  Form, Button, ListGroup, Row, Col, Card, Container
} from 'react-bootstrap';
import { getPasos, savePaso, deletePaso, getPeriodoActual } from '../utils/dataService';
import PeriodoConfig from './PeriodoConfig';

const FORMULARIOS_DISPONIBLES = [
  'Admisión',
  'Selección de Curso',
  'Pago',
  'Encuesta'
];

function Configuration() {
  const [pasos, setPasos] = useState([]);
  const [nuevo, setNuevo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [url, setUrl] = useState('');
  const [modo, setModo] = useState('local');

  useEffect(() => {
    cargar();
    const guardado = localStorage.getItem('modo') || 'local';
    setModo(guardado);
  }, []);

  const cargar = async () => {
    const modo = localStorage.getItem('modo');
    const periodoId = localStorage.getItem('periodoActual');

    if (modo === 'backend' && !periodoId) {
      alert("⚠️ No hay periodo actual definido.");
      return;
    }

    const pasos = modo === 'backend'
      ? await getPasos(periodoId)
      : await getPasos();

    setPasos(pasos);
  };

  const agregar = async () => {
    if (!nuevo.trim() || !codigo.trim() || !url.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    let periodoId = null;

    if (modo === 'backend') {
      const periodo = await getPeriodoActual();
      if (!periodo?.id) {
        alert("No hay periodo activo definido en backend.");
        return;
      }
      periodoId = periodo.id;
    } else {
      periodoId = localStorage.getItem('periodoActual');
      if (!periodoId) {
        alert("No hay periodo activo definido en LocalStorage.");
        return;
      }
    }

    const nuevoPaso = await savePaso({
      nombre: nuevo,
      codigo: codigo.trim(),
      url: url.trim(),
      orden: pasos.length + 1,
      periodoId: parseInt(periodoId)
    });

    setPasos([...pasos, nuevoPaso]);
    setNuevo('');
    setCodigo('');
    setUrl('');
  };

  const eliminar = async (paso, index) => {
    await deletePaso(paso.id, index);
    const actualizados = pasos.filter((_, i) => i !== index);
    setPasos(actualizados.map((p, idx) => ({ ...p, orden: idx + 1 })));
  };

  const mover = (index, direccion) => {
    const nuevoIndex = direccion === 'up' ? index - 1 : index + 1;
    if (nuevoIndex < 0 || nuevoIndex >= pasos.length) return;
    const nuevaLista = [...pasos];
    const temp = nuevaLista[index];
    nuevaLista[index] = nuevaLista[nuevoIndex];
    nuevaLista[nuevoIndex] = temp;
    setPasos(nuevaLista.map((p, idx) => ({ ...p, orden: idx + 1 })));
  };

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4 text-primary">Configuración General</h3>

      <Row xs={1} md={2} className="g-4">
        {/* Cuadrante 1: Modo de datos */}
        <Col>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">Modo de Datos</Card.Header>
            <Card.Body>
              <Form.Group controlId="modo">
                <Form.Label>Selecciona de dónde obtener los datos:</Form.Label>
                <Form.Select
                  value={modo}
                  onChange={e => {
                    setModo(e.target.value);
                    localStorage.setItem('modo', e.target.value);
                    alert(`Modo actualizado a: ${e.target.value}`);
                    window.location.reload();
                  }}
                >
                  <option value="local">LocalStorage</option>
                  <option value="backend">Backend (NodeJS + SQLite)</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Cuadrante 2: Configurar Periodos */}
        <Col>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="text-white" style={{ backgroundColor: '#6f42c1' }}>
              Gestión de Periodos Académicos
            </Card.Header>
            <Card.Body>
              <PeriodoConfig />
            </Card.Body>
          </Card>
        </Col>

        {/* Cuadrante 3: Flujo de pasos */}
        <Col>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-info text-white">Flujo de Matrícula</Card.Header>
            <Card.Body>
              <Form className="mb-3">
                <Row className="mb-2">
                  <Col md={4}>
                    <Form.Control
                      placeholder="Código (ej: admision)"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Select value={nuevo} onChange={e => setNuevo(e.target.value)}>
                      <option value="">Seleccionar paso...</option>
                      {FORMULARIOS_DISPONIBLES.map((nombre, idx) => (
                        <option key={idx} value={nombre}>{nombre}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      placeholder="Ruta URL (ej: admision)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={agregar}
                      disabled={!nuevo || !codigo.trim() || !url.trim()}
                      className="w-100"
                      variant="info"
                    >
                      Agregar Paso
                    </Button>
                  </Col>
                </Row>
              </Form>
              <ListGroup>
                {pasos.map((paso, i) => (
                  <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{i + 1}. {paso.nombre}</strong> — <code>{paso.codigo}</code> — <em>/{paso.url}</em>
                    </div>
                    <div>
                      <Button size="sm" variant="outline-secondary" className="me-1" onClick={() => mover(i, 'up')}>↑</Button>
                      <Button size="sm" variant="outline-secondary" className="me-1" onClick={() => mover(i, 'down')}>↓</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => eliminar(paso, i)}>Eliminar</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Cuadrante 4: Información / ayuda */}
        <Col>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-light">🧭 Guía Rápida</Card.Header>
            <Card.Body>
              <ul className="text-muted small ps-3">
                <li>Agrega los pasos de matrícula desde la lista disponible.</li>
                <li>Completa código y ruta antes de agregar.</li>
                <li>Usa las flechas para reordenar el flujo.</li>
                <li>Configura el periodo activo en el módulo correspondiente.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Configuration;
