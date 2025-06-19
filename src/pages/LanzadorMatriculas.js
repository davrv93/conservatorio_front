import React, { useState } from 'react';
import { Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Container, Card, Form, Button, Row, Col, ListGroup, Nav } from 'react-bootstrap';

import { Modal } from 'react-bootstrap';

const pasosFormulario = [
  'Periodo',
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

function VistaPreviaConPasosFiltrados({ form, onBack, onConfirm }) {
  const pasosPreview = form.pasos;
  const [step, setStep] = useState(0);
  const [selectedMeses, setSelectedMeses] = useState([1]);
  const [activeMes, setActiveMes] = useState(1);
  const [mostrarSilabo, setMostrarSilabo] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [mostrarBoleta, setMostrarBoleta] = useState(false);

  const toggleMes = (mes) => {
    setSelectedMeses(prev =>
      prev.includes(mes) ? prev.filter(m => m !== mes) : [...prev, mes]
    );
  };
  
  const horariosPorMes = {
    1: [
      { dia: 'Lunes', hora: '4:00pm - 5:00pm' },
      { dia: 'Miércoles', hora: '4:00pm - 5:00pm' },
      { dia: 'Viernes', hora: '4:00pm - 5:00pm' }
    ],
    2: [
      { dia: 'Martes', hora: '5:00pm - 6:00pm' },
      { dia: 'Jueves', hora: '3:00pm - 4:00pm' }
    ],
    3: [
      { dia: 'Lunes', hora: '6:00pm - 7:00pm' },
      { dia: 'Miércoles', hora: '5:00pm - 6:00pm' },
      { dia: 'Viernes', hora: '4:00pm - 5:00pm' }
    ]
  };
  
 

  
  const renderPaso = (label) => {
    switch (label) {
        case 'Datos Personales':
          return (
            <>
              <Row className="g-3">
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="nombre" placeholder="Ingresa tu nombre" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control name="apellidoPaterno" placeholder="Apellido paterno" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control name="apellidoMaterno" placeholder="Apellido materno" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>DNI</Form.Label>
                    <Form.Control name="documento" placeholder="Documento de identidad" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" name="correo" placeholder="ejemplo@correo.com" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control name="telefono" placeholder="Número de teléfono" />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control name="direccion" placeholder="Dirección completa" />
                    </Form.Group>
                </Col>
                </Row>
            </>
          );
        case 'Selección de Cursos':
          return <Row className="align-items-start g-4">
          <Col md={6}>
            <h5 className="mb-3">🎵 Programa seleccionado</h5>
            <p><strong>{form.programa}</strong></p>
        
            <Form.Group>
              <Form.Label>Duración (meses)</Form.Label>
              <div>
                {[1, 2, 3].map(mes => (
                  <Form.Check
                    inline
                    type="checkbox"
                    label={`${mes} mes${mes > 1 ? 'es' : ''}`}
                    key={mes}
                    id={`mes-${mes}`}
                    checked={selectedMeses.includes(mes)}
                    onChange={() => toggleMes(mes)}
                    title={`Duración de ${mes} mes${mes > 1 ? 'es' : ''}`}
                  />
                ))}
              </div>
            </Form.Group>
        
            <Button variant="outline-info" className="mt-3" onClick={() => setMostrarSilabo(true)}>
              📘 Ver Sílabo del curso
            </Button>
        
            <Modal show={mostrarSilabo} onHide={() => setMostrarSilabo(false)} centered size="lg">
              <Modal.Header closeButton>
                <Modal.Title>📘 Sílabo - {form.programa}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Objetivo del Curso</h5>
                <p>Desarrollar habilidades técnicas e interpretativas básicas en el instrumento musical asignado.</p>
        
                <h5>Unidades</h5>
                <ul>
                  <li>Unidad 1: Postura y técnica básica</li>
                  <li>Unidad 2: Escalas y ejercicios de digitación</li>
                  <li>Unidad 3: Lectura musical y ritmo</li>
                  <li>Unidad 4: Interpretación de piezas simples</li>
                </ul>
        
                <h5>Evaluación</h5>
                <p>Participación, prácticas semanales, evaluación de ejecución y concierto final.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarSilabo(false)}>Cerrar</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        
          <Col md={6}>
            <h5 className="mb-3">🗓 Horario</h5>
            <Tabs activeKey={activeMes} onSelect={(k) => setActiveMes(Number(k))} className="mb-3">
              {selectedMeses.map(mes => (
                <Tab eventKey={mes} title={`Mes ${mes}`} key={mes}>
                  <ListGroup>
                    {horariosPorMes[mes]?.map(({ dia, hora }, index) => (
                      <OverlayTrigger
                        key={index}
                        placement="top"
                        overlay={<Tooltip>{`${dia} ${hora}`}</Tooltip>}
                      >
                        <ListGroup.Item className="d-flex justify-content-between">
                          <span>{dia}</span>
                          <span>{hora}</span>
                        </ListGroup.Item>
                      </OverlayTrigger>
                    ))}
                  </ListGroup>
                  <div className="text-muted mt-2">Mes {mes} - {['Junio', 'Julio', 'Agosto'][mes - 1]} 2025</div>
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row> ;
        case 'Pago':

          return <><Card className="mb-3 shadow-sm">
          <Card.Header className="bg-light"><strong>💳 Resumen de Pago</strong></Card.Header>
          <Card.Body>
            <Row className="mb-2">
              <Col><strong>Programa:</strong></Col>
              <Col>{form.programa}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Precio:</strong></Col>
              <Col>{form.precio}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Duración:</strong></Col>
              <Col>{selectedMeses.length} mes(es)</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Fechas:</strong></Col>
              <Col>{form.fechaInicio} a {form.fechaFin}</Col>
            </Row>
      
            <div className="text-end mt-3">
              <Button variant="primary" onClick={() => setMostrarPago(true)}>Pagar con VISA</Button>
            </div>
          </Card.Body>
        </Card> 
        <Modal show={mostrarPago} onHide={() => setMostrarPago(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>💳 Pago con Tarjeta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control type="text" placeholder="Ej. Juan Pérez" />
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" />
            </Form.Group>
    
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Vencimiento</Form.Label>
                  <Form.Control type="text" placeholder="MM/AA" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="XXX" />
                </Form.Group>
              </Col>
            </Row>
    
            <Button variant="success" className="w-100" onClick={() => { setMostrarPago(false); alert('Pago procesado exitosamente'); }}>
              Confirmar Pago
            </Button>
          </Form>
        </Modal.Body>
      </Modal></>;
        case 'Confirmación':
          return (
            <>
                <h5 className="mb-3">📝 Resumen Final</h5>
                
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <strong>📅 Fechas:</strong> {form.fechaInicio} &nbsp;—&nbsp; {form.fechaFin}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <strong>⏳ Duración:</strong> {selectedMeses.length} mes{selectedMeses.length > 1 ? 'es' : ''}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <strong>🎵 Programa:</strong> {form.programa}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <strong>💰 Dinámica:</strong> {form.precio}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <strong>🗓 Horario de Clase:</strong>
                    <ListGroup className="mt-2">
                        {selectedMeses.map(mes => (
                        <ListGroup.Item key={mes} className="bg-light">
                            <strong>Mes {mes} - {['Junio', 'Julio', 'Agosto'][mes - 1]}</strong>
                            <ul className="mb-0 mt-1">
                            {horariosPorMes[mes]?.map(({ dia, hora }, idx) => (
                                <li key={idx}>{dia}: {hora}</li>
                            ))}
                            </ul>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </ListGroup.Item>

                    <ListGroup.Item className="text-end">
                    <Button variant="outline-dark" onClick={() => setMostrarBoleta(true)}>📄 Ver Boleta Electrónica</Button>
                    </ListGroup.Item>
                </ListGroup>

                <Modal show={mostrarBoleta} onHide={() => setMostrarBoleta(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Boleta Electrónica</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p><strong>RUC:</strong> 20123456789</p>
                    <p><strong>Razón Social:</strong> Conservatorio Musical Esperanza</p>
                    <p><strong>Dirección:</strong> Av. La Cultura 123, Lima</p>
                    <p><strong>Fecha de Emisión:</strong> 18/06/2025</p>
                    <p><strong>Número de Boleta:</strong> B2035-001234</p>
                    <hr />
                    <p><strong>Alumno:</strong> Samuel David Roncal vidal</p>
                    <p><strong>DNI:</strong>  48054725</p>
                    <ListGroup className="mt-3">
                        <ListGroup.Item><strong>Descripción:</strong> Programa: {form.programa}</ListGroup.Item>
                        <ListGroup.Item><strong>Cantidad:</strong> 1</ListGroup.Item>
                        <ListGroup.Item><strong>Precio Unitario:</strong> {form.precio}</ListGroup.Item>
                        <ListGroup.Item><strong>Subtotal:</strong> {form.precio}</ListGroup.Item>
                    </ListGroup>
                    <div className="text-end mt-3">
                        <h5>Total: {form.precio}</h5>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarBoleta(false)}>Cerrar</Button>
                    <Button variant="primary">Descargar PDF</Button>
                    </Modal.Footer>
                </Modal>
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

        <div className="mb-4 px-2">
          {renderPaso(pasosPreview[step])}
        </div>

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
  const [confirmado, setConfirmado] = useState(false);

  const handleChange = (e) => {
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

  const confirmar = () => {
    if (!form.periodo || !form.programa || !form.precio || !form.fechaInicio || !form.fechaFin || form.pasos.length === 0) {
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
                    <Form.Group className="mb-3">
                      <Form.Label>Periodo Académico</Form.Label>
                      <Form.Select name="periodo" value={form.periodo} onChange={handleChange}>
                        <option value=''>Seleccione un periodo</option>
                        {periodos.map(p => <option key={p} value={p}>{p}</option>)}
                      </Form.Select>
                    </Form.Group>
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
                          onChange={handleChange}
                        />
                      ))}
                    </Form.Group>
                  )}

                  {step === 2 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Programa / Módulo Musical</Form.Label>
                      <Form.Select name="programa" value={form.programa} onChange={handleChange}>
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
                      <Form.Select name="precio" value={form.precio} onChange={handleChange}>
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
                        <Form.Control type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Fin</Form.Label>
                        <Form.Control type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
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
            <VistaPreviaConPasosFiltrados form={form} onBack={() => setConfirmado(false)} onConfirm={guardar} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AutoEnroll;