import React, { useState } from 'react';
import {
  Container, Button, Table, Modal, Form, Row, Col, InputGroup
} from 'react-bootstrap';

export default function CourseForm() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursos, setCursos] = useState([]);

  const [curso, setCurso] = useState({
    id: 'PR-001',
    nombre: '',
    horario: '',
    creditosTeoricos: 10,
    horasTeoricas: 10,
    horasPracticas: 10,
    horasNoPracticas: 10,
    estado: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({ ...prev, [name]: value }));
  };

  const ajustarValor = (campo, incremento) => {
    setCurso(prev => ({
      ...prev,
      [campo]: Math.max(0, prev[campo] + incremento)
    }));
  };

  const guardarCurso = () => {
    setCursos(prev => [...prev, curso]);
    setCurso({
      id: `PR-${String(cursos.length + 2).padStart(3, '0')}`,
      nombre: '',
      horario: '',
      creditosTeoricos: 10,
      horasTeoricas: 10,
      horasPracticas: 10,
      horasNoPracticas: 10,
      estado: true
    });
    setMostrarModal(false);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>🎓 Registro de Cursos</h4>
        <Button variant="primary" onClick={() => setMostrarModal(true)}>➕ Nuevo curso</Button>
      </div>

      {cursos.length === 0 ? (
        <p className="text-muted">No hay cursos registrados aún.</p>
      ) : (
        <Table bordered hover responsive>
        <thead className="table-light text-center align-middle">
          <tr>
            <th style={{ width: '5%' }}>N°</th>
            <th style={{ width: '35%' }}>Cursos</th>
            <th style={{ width: '20%' }}>Horas</th>
            <th style={{ width: '15%' }}>Estado</th>
            <th style={{ width: '10%' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((c, i) => (
            <tr key={i} className="align-middle text-center">
              <td>{String(i + 1).padStart(2, '0')}</td>
              <td className="text-start">{c.nombre}</td>
              <td>{c.horario || 'Conservatorio 45min'}</td>
              <td>
                <span className={`badge rounded-pill bg-${c.estado ? 'success' : 'secondary'} px-3 py-1`}>
                  {c.estado ? '✔ Activo' : '⚠ Inactivo'}
                </span>
              </td>
              <td>
                <Button size="sm" variant="outline-info">
                  <i className="bi bi-gear-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>🎹 Nuevo curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control value={curso.id} disabled />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Nombre del curso</Form.Label>
              <Form.Control name="nombre" value={curso.nombre} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Horario</Form.Label>
              <Form.Select name="horario" value={curso.horario} onChange={handleChange}>
                <option value="">Seleccione un horario</option>
                <option>Lunes 8am - 10am</option>
                <option>Martes 10am - 12pm</option>
                <option>Miércoles 4pm - 6pm</option>
              </Form.Select>
            </Form.Group>

            <Row className="mb-2">
              <Col>
                <Form.Label>Créditos Teóricos</Form.Label>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={() => ajustarValor('creditosTeoricos', -1)}>-</Button>
                  <Form.Control value={curso.creditosTeoricos} readOnly />
                  <Button variant="outline-secondary" onClick={() => ajustarValor('creditosTeoricos', 1)}>+</Button>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label>Horas Teóricas</Form.Label>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasTeoricas', -1)}>-</Button>
                  <Form.Control value={curso.horasTeoricas} readOnly />
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasTeoricas', 1)}>+</Button>
                </InputGroup>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <Form.Label>Horas Prácticas</Form.Label>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasPracticas', -1)}>-</Button>
                  <Form.Control value={curso.horasPracticas} readOnly />
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasPracticas', 1)}>+</Button>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label>Horas no Prácticas</Form.Label>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasNoPracticas', -1)}>-</Button>
                  <Form.Control value={curso.horasNoPracticas} readOnly />
                  <Button variant="outline-secondary" onClick={() => ajustarValor('horasNoPracticas', 1)}>+</Button>
                </InputGroup>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Check
                type="switch"
                label={curso.estado ? 'Activo' : 'Inactivo'}
                checked={curso.estado}
                onChange={() => setCurso(prev => ({ ...prev, estado: !prev.estado }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={guardarCurso}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
