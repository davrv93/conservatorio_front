
// Lanzador de Matrículas con Vista Previa filtrada por pasos activos
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ListGroup, Nav } from 'react-bootstrap';

const pasosFormulario = [
  'Periodo',
  'Pasos del proceso',
  'Programa',
  'Precio',
  'Fechas'
];

const pasosDisponibles = [
  { id: 'Datos Personales', campo: 'datos' },
  { id: 'Selección de Cursos', campo: 'cursos' },
  { id: 'Pago', campo: 'pago' },
  { id: 'Confirmación', campo: 'confirmacion' }
];

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

  const renderPaso = (label) => {
    switch (label) {
      case 'Datos Personales':
        return <p><strong>Periodo:</strong> {form.periodo}</p>;
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

export default VistaPreviaConPasosFiltrados;