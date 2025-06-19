import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Badge, Form, Dropdown, InputGroup } from 'react-bootstrap';
import { FaTrash, FaCog, FaPlus, FaBookOpen, FaLayerGroup, FaCalendarAlt } from 'react-icons/fa';

const programasMock = [
  {
    nombre: 'Nivel Conservatorio',
    categoria: 'Formación musical',
    estado: 'Activo',
    cursos: 30,
    planes: 3,
    semestres: 5
  },
  {
    nombre: 'Taller de instrumento',
    categoria: 'Cursos y Talleres prácticos',
    estado: 'Activo',
    cursos: 30,
    planes: 0,
    semestres: 5
  },
  {
    nombre: 'Aprestamiento musical',
    categoria: 'Formación musical',
    estado: 'Activo',
    cursos: 30,
    planes: 3,
    semestres: 5
  },
  {
    nombre: 'Cursos libres',
    categoria: 'Cursos y Talleres prácticos',
    estado: 'Activo',
    cursos: 30,
    planes: 0,
    semestres: 5
  },
  {
    nombre: 'Programas adicionales',
    categoria: 'Cursos y Talleres prácticos',
    estado: 'Inactivo',
    cursos: 0,
    planes: 0,
    semestres: 5
  }
];

export default function GestionProgramas() {
  const [programas, setProgramas] = useState(programasMock);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📘 Gestión de Programas</h4>
        <div className="d-flex gap-2">
          <Button variant="warning">❓ Ayuda</Button>
          <Button variant="outline-primary">🔄 Actualizar</Button>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">Periodo</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>2025-I</Dropdown.Item>
              <Dropdown.Item>2025-II</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">Categoría</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Formación musical</Dropdown.Item>
              <Dropdown.Item>Cursos y Talleres prácticos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">A-Z</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Nombre ascendente</Dropdown.Item>
              <Dropdown.Item>Nombre descendente</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <InputGroup style={{ maxWidth: 250 }}>
          <Form.Control placeholder="Buscar nombre" />
        </InputGroup>

        <Button variant="primary"><FaPlus /> Nuevo</Button>
      </div>

      <Row className="g-4">
        {programas.map((p, idx) => (
          <Col md={6} lg={4} key={idx}>
            <Card className="shadow-sm border-0" style={{ background: '#f8f9fa' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="small text-muted">Programa</div>
                    <div className="fw-bold">Categoría: {p.categoria}</div>
                    <h5 className="mt-1">{p.nombre}</h5>
                  </div>
                  <Badge bg={p.estado === 'Activo' ? 'success' : 'danger'} className="mt-1">
                    {p.estado}
                  </Badge>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Button size="sm" variant="outline-primary"><FaBookOpen /> Ver cursos</Button>
                  <Button size="sm" variant="outline-success"><FaLayerGroup /> Ver planes</Button>
                  <Button size="sm" variant="outline-warning"><FaCalendarAlt /> Ver semestres</Button>
                  {p.planes > 0 && (
                    <Button size="sm" variant="outline-info">Ver carga</Button>
                  )}
                </div>

                <div className="mt-3 d-flex justify-content-around text-center">
                  <div><div className="fw-bold fs-5">{p.cursos}</div><div className="small">Cursos</div></div>
                  <div><div className="fw-bold fs-5">{p.planes}</div><div className="small">Planes</div></div>
                  <div><div className="fw-bold fs-5">{p.semestres}</div><div className="small">Semestres</div></div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <Button size="sm" variant="outline-secondary"><FaCog /> Configurar</Button>
                  <Button size="sm" variant="outline-danger"><FaTrash /> Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
