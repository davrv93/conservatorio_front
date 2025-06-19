import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ListGroup, Nav } from 'react-bootstrap';

const pasosFormulario = [
  'Datos Personales',
  'Pasos del proceso',
  'Programa',
  'Precio',
  'Fechas'
];

const pasosDisponibles = ['Datos Personales', 'Selección de Cursos', 'Pago', 'Confirmación'];
const periodos = ['2025-I', '2025-II', '2026-I'];
const programas = [
  { nombre: 'Piano Nivel 1', activo: true },
  { nombre: 'Violín Intermedio', activo: true }
];
const dinamicas = [
  { id: 'basic', nombre: 'S/150 - Básico' },
  { id: 'pro', nombre: 'S/250 - Profesional' },
  { id: 'premium', nombre: 'S/400 - Masterclass' }
];

function VistaPreviaConPasosFiltrados({ form, datos, onBack, onConfirm }) {
  const pasosPreview = form.pasos;
  const [step, setStep] = useState(0);

  const renderPaso = (label) => {
    switch (label) {
      case 'Datos Personales':
        return (
          <div>
            <p><strong>Nombre:</strong> {datos.nombre} {datos.apellidoPaterno} {datos.apellidoMaterno}</p>
            <p><strong>DNI:</strong> {datos.documento}</p>
            <p><strong>Correo:</strong> {datos.correo}</p>
            <p><strong>Teléfono:</strong> {datos.telefono}</p>
            <p><strong>Dirección:</strong> {datos.direccion}</p>
          </div>
        );
      case 'Selección de Cursos':
        return <p><strong>Programa:</strong> {form.programa}</p>;
      case 'Pago':
        return <p><strong>Precio:</strong> {form.precio}</p>;
      case 'Confirmación':
        return (
          <>
            <p><strong>Inicio:</strong> {form.fechaInicio} <br /><strong>Fin:</strong> {form.fechaFin}</p>
            <p><strong>Horario de muestra:</strong></p>
            <ListGroup variant="flush">
              <ListGroup.Item>Lunes 9:00am - 11:00am</ListGroup.Item>
              <ListGroup.Item>Miércoles 2:00pm - 4:00pm</ListGroup.Item>
              <ListGroup.Item>Viernes 10:00am - 12:00pm</ListGroup.Item>
            </ListGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mt-4 shadow border-info">
      <Card.Header className="bg-info text-white">Vista previa</Card.Header>
      <Card.Body>
        <Nav variant="pills" className="justify-content-center mb-4 flex-wrap">
          {pasosPreview.map((label, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link
                active={idx === step}
                onClick={() => setStep(idx)}
                className={idx < step ? 'text-success' : ''}
              >
                {idx < step ? '✅' : idx === step ? '🔵' : '⚪'} {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="mb-4 px-2">{renderPaso(pasosPreview[step])}</div>

        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={onBack}>Volver</Button>
          <Button variant="primary" onClick={onConfirm}>Confirmar y Guardar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function AutoEnroll() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    periodo: '',
    pasos: [],
    programa: '',
    precio: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [datos, setDatos] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    documento: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  const [confirmado, setConfirmado] = useState(false);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        pasos: checked ? [...prev.pasos, value] : prev.pasos.filter(p => p !== value)
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const confirmar = () => {
    if (
      !form.periodo || !form.programa || !form.precio || !form.fechaInicio || !form.fechaFin ||
      form.pasos.length === 0 || !datos.nombre || !datos.documento
    ) {
      alert('Por favor complete todos los campos obligatorios y seleccione al menos un paso.');
      return;
    }
    setConfirmado(true);
  };

  const guardar = () => {
    alert('¡Matrícula guardada exitosamente!');
  };

  return (
    <Container className="py-5" style={{ background: 'linear-gradient(to bottom right, #e0e7ff, #ffffff, #ede9fe)' }}>
      <Row className="justify-content-center">
        <Col md={10}>
          {!confirmado ? (
            <>
              <Nav variant="tabs" className="mb-4 justify-content-center">
                {pasosFormulario.map((p, i) => (
                  <Nav.Item key={i}>
                    <Nav.Link active={step === i} onClick={() => setStep(i)}>
                      Paso {i + 1}: {p}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Card className="shadow">
                <Card.Body>
                  {step === 0 && (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" value={datos.nombre} onChange={handleDatosChange} />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control name="apellidoPaterno" value={datos.apellidoPaterno} onChange={handleDatosChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-2">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control name="apellidoMaterno" value={datos.apellidoMaterno} onChange={handleDatosChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-2">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control name="documento" value={datos.documento} onChange={handleDatosChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control name="correo" type="email" value={datos.correo} onChange={handleDatosChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control name="telefono" value={datos.telefono} onChange={handleDatosChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control name="direccion" value={datos.direccion} onChange={handleDatosChange} />
                      </Form.Group>
                    </>
                  )}

                  {step === 1 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Pasos del proceso</Form.Label>
                      {pasosDisponibles.map(p => (
                        <Form.Check
                          type="checkbox"
                          label={p}
                          value={p}
                          key={p}
                          checked={form.pasos.includes(p)}
                          onChange={handleFormChange}
                        />
                      ))}
                    </Form.Group>
                  )}

                  {step === 2 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Programa / Módulo Musical</Form.Label>
                      <Form.Select name="programa" value={form.programa} onChange={handleFormChange}>
                        <option value=''>Seleccione un programa</option>
                        {programas.filter(p => p.activo).map(p => (
                          <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}

                  {step === 3 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Precio / Dinámica</Form.Label>
                      <Form.Select name="precio" value={form.precio} onChange={handleFormChange}>
                        <option value=''>Seleccione un precio</option>
                        {dinamicas.map(d => (
                          <option key={d.id} value={d.nombre}>{d.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}

                  {step === 4 && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <Form.Control type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleFormChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Fin</Form.Label>
                        <Form.Control type="date" name="fechaFin" value={form.fechaFin} onChange={handleFormChange} />
                      </Form.Group>
                    </>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Atrás</Button>
                    {step < pasosFormulario.length - 1
                      ? <Button variant="primary" onClick={() => setStep(step + 1)}>Siguiente</Button>
                      : <Button variant="success" onClick={confirmar}>Lanzar Matrícula</Button>
                    }
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            <VistaPreviaConPasosFiltrados form={form} datos={datos} onBack={() => setConfirmado(false)} onConfirm={guardar} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AutoEnroll;