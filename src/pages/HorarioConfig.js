import React, { useState } from 'react';
import {
  Container, Form, Table, Row, Col, Button, Card
} from 'react-bootstrap';

const instrumentos = ['Piano', 'Violín', 'Guitarra', 'Canto', 'Flauta'];
const niveles = ['Nivel 1 (Básico)', 'Nivel 2 (Intermedio)', 'Nivel 3 (Avanzado)'];
const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const generarHoras = () => {
  const horas = [];
  let start = 8 * 60; // 8:00 AM
  let end = 20 * 60; // 8:00 PM
  while (start + 60 <= end) {
    const h = Math.floor(start / 60);
    const m = start % 60;
    const h2 = Math.floor((start + 60) / 60);
    const m2 = (start + 60) % 60;
    horas.push(
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} - ${h2.toString().padStart(2, '0')}:${m2
        .toString()
        .padStart(2, '0')}`
    );
    start += 60;
  }
  return horas;
};

const horas = generarHoras();

function HorarioConservatorio() {
  const [instrumento, setInstrumento] = useState('');
  const [nivel, setNivel] = useState('');
  const [seleccionados, setSeleccionados] = useState({});

  const toggleCelda = (dia, hora) => {
    const clave = `${dia}|${hora}`;
    setSeleccionados((prev) => ({ ...prev, [clave]: !prev[clave] }));
  };

  const guardar = () => {
    const seleccion = Object.entries(seleccionados)
      .filter(([_, v]) => v)
      .map(([k]) => {
        const [dia, hora] = k.split('|');
        return { dia, hora };
      });

    alert(`🎼 Horarios asignados para ${instrumento} - ${nivel}:\n\n${JSON.stringify(seleccion, null, 2)}`);
  };

  return (
    <Container className="py-4">
      <h3 className="text-primary mb-4">🎻 Configuración de Horarios - Conservatorio</h3>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Instrumento Musical</Form.Label>
                <Form.Select value={instrumento} onChange={(e) => setInstrumento(e.target.value)}>
                  <option value="">Seleccione...</option>
                  {instrumentos.map((i, idx) => (
                    <option key={idx} value={i}>{i}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nivel de Formación</Form.Label>
                <Form.Select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                  <option value="">Seleccione...</option>
                  {niveles.map((n, idx) => (
                    <option key={idx} value={n}>{n}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {instrumento && nivel && (
        <Card className="shadow-sm">
          <Card.Header className="bg-success text-white">
            Disponibilidad Horaria para {instrumento} - {nivel}
          </Card.Header>
          <Card.Body style={{ overflowX: 'auto' }}>
            <Table bordered responsive className="text-center align-middle">
              <thead>
                <tr>
                  <th>Hora / Día</th>
                  {dias.map((d, i) => <th key={i}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {horas.map((h, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 'bold' }}>{h}</td>
                    {dias.map((d, j) => {
                      const clave = `${d}|${h}`;
                      return (
                        <td key={j}>
                          <Form.Check
                            type="checkbox"
                            checked={seleccionados[clave] || false}
                            onChange={() => toggleCelda(d, h)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" onClick={guardar}>💾 Guardar Horario</Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default HorarioConservatorio;
