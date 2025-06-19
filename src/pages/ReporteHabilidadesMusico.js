// src/components/ReporteHabilidadesMusico.js
import React, { useState, useEffect } from 'react';
import {
  Container, Card, Button, Row, Col,
  ProgressBar, Table, Tabs, Tab, OverlayTrigger, Tooltip, Modal
} from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend);

const habilidades = ['Lectura Musical', 'Técnica', 'Expresión', 'Improvisación', 'Teoría'];
const leyenda = {
  'Lectura Musical': 'Interpretación de partituras y notación musical',
  'Técnica': 'Precisión y ejecución en el instrumento',
  'Expresión': 'Transmisión emocional en la interpretación',
  'Improvisación': 'Creatividad musical sin partitura',
  'Teoría': 'Conocimiento estructural de la música'
};

function generarDataAleatoria() {
  const randomSkill = () => Math.floor(Math.random() * 41) + 60;
  return {
    piano: habilidades.map(randomSkill),
    guitarra: habilidades.map(randomSkill),
    voz: habilidades.map(randomSkill),
    progreso: {
      piano: Math.floor(Math.random() * 101),
      guitarra: Math.floor(Math.random() * 101),
      voz: Math.floor(Math.random() * 101)
    }
  };
}

function obtenerRecomendacion(porcentaje, instrumento) {
  if (porcentaje < 50) return `⚠️ Progreso bajo en ${instrumento}. Repetir módulo básico.`;
  if (porcentaje < 80) return `🔁 Buen avance en ${instrumento}, pero hay áreas por reforzar.`;
  return `✅ Excelente en ${instrumento}. Listo para niveles avanzados.`;
}

export default function ReporteHabilidadesMusico() {
  const [data, setData] = useState(generarDataAleatoria());
  const [bitacora, setBitacora] = useState([]);
  const [codigoPersona, setCodigoPersona] = useState('A001');

  const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);

  const insignias = [
    { nombre: 'Partitura Dorada', instrumento: 'Piano', fecha: '01/03/2025', descripcion: 'Terminó nivel intermedio de piano con excelencia', emoji: '🎼' },
    { nombre: 'Maestro de Cuerdas', instrumento: 'Guitarra', fecha: '15/04/2025', descripcion: 'Completó los tres niveles con puntuación destacada', emoji: '🎸' },
    { nombre: 'Voz de Diamante', instrumento: 'Voz', fecha: '20/05/2025', descripcion: 'Desempeño sobresaliente en técnica vocal', emoji: '🎤' }
  ];

  const generarChartData = (instrumento) => ({
    labels: habilidades,
    datasets: [{
      label: instrumento.charAt(0).toUpperCase() + instrumento.slice(1),
      data: data[instrumento],
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2
    }]
  });

  const cargarBitacora = () => {
    const todas = JSON.parse(localStorage.getItem('bitacora') || '[]');
    const filtradas = todas.filter(b => b.codigo === codigoPersona);
    setBitacora(filtradas);
  };

  const exportarBitacora = () => {
    if (!bitacora.length) return;
    const doc = new jsPDF();
    doc.text(`Bitácora de Matrícula - Persona: ${codigoPersona}`, 10, 10);
    doc.autoTable({
      head: [['#', 'Paso', 'Fecha y Hora']],
      body: bitacora.map((b, i) => [i + 1, b.paso, new Date(b.timestamp).toLocaleString()])
    });
    doc.save(`bitacora_${codigoPersona}.pdf`);
  };

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
        <h5 className="text-center text-primary mb-4">🎼 Reporte del Músico</h5>

        <Tabs defaultActiveKey="habilidades" className="mb-3 justify-content-center">
          <Tab eventKey="habilidades" title="Reporte de Habilidades">
            <Tabs defaultActiveKey="piano" className="mb-3 justify-content-center mt-3">
              {['piano', 'guitarra', 'voz'].map(instr => (
                <Tab eventKey={instr} title={instr.charAt(0).toUpperCase() + instr.slice(1)} key={instr}>
                  <Row className="mt-3 align-items-center">
                    <Col md={6} className="text-center">
                      <div style={{ maxWidth: 300, margin: '0 auto' }}>
                        <Radar data={generarChartData(instr)} options={{ scales: { r: { min: 0, max: 100 } } }} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6>Progreso en {instr.charAt(0).toUpperCase() + instr.slice(1)}</h6>
                      <ProgressBar
                        now={data.progreso[instr]}
                        label={`${data.progreso[instr]}%`}
                        variant="info"
                        className="mb-4"
                      />
                      <h6>🧠 Leyenda de Habilidades</h6>
                      <Table size="sm" bordered hover>
                        <thead><tr><th>Habilidad</th><th>Descripción</th></tr></thead>
                        <tbody>{habilidades.map((h, i) => (
                          <tr key={i}><td>{h}</td><td>{leyenda[h]}</td></tr>
                        ))}</tbody>
                      </Table>
                    </Col>
                  </Row>
                </Tab>
              ))}
            </Tabs>
          </Tab>

          <Tab eventKey="bitacora" title="Histórico de Matrículas">
            <Row className="mt-4">
              <Col md={6}>
                <label>Código de Persona:</label>
                <input
                  className="form-control mb-2"
                  value={codigoPersona}
                  onChange={e => setCodigoPersona(e.target.value)}
                />
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button onClick={cargarBitacora} className="me-2">Buscar</Button>
                <Button variant="outline-success" onClick={exportarBitacora}>Exportar PDF</Button>
              </Col>
            </Row>
            <hr />
            {bitacora.length > 0 ? (
              <Table striped bordered hover className="mt-3">
                <thead><tr><th>#</th><th>Paso</th><th>Fecha y Hora</th></tr></thead>
                <tbody>
                  {bitacora.map((b, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{b.paso}</td>
                      <td>{new Date(b.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : <p className="text-muted">No hay registros disponibles.</p>}
          </Tab>
          <Tab eventKey="progreso" title="Reporte de Progreso">
            <Row className="mt-4">
              {['piano', 'guitarra', 'voz'].map((instr, idx) => {
                const progreso = data.progreso[instr];
                const color = progreso > 80 ? '#198754' : progreso > 50 ? '#ffc107' : '#dc3545';
                return (
                  <Col md={4} key={idx} className="text-center mb-4">
                    <h6>{instr.charAt(0).toUpperCase() + instr.slice(1)}</h6>
                    <div style={{
                      width: 140, height: 140, borderRadius: '50%',
                      border: `10px solid ${color}`,
                      position: 'relative', lineHeight: '120px',
                      fontSize: '1.4rem', fontWeight: 'bold',
                      color: '#333', margin: '0 auto',
                      background: '#f8f9fa'
                    }}>
                      {progreso}%
                    </div>
                    <p className="mt-3 text-muted">{obtenerRecomendacion(progreso, instr)}</p>
                  </Col>
                );
              })}
            </Row>
          </Tab>

          <Tab eventKey="insignias" title="Insignias">
            <h5 className="text-center mt-3 mb-4">🎖 Logros y Distinciones</h5>
            <Row className="text-center g-4">
              {insignias.map((insignia, idx) => (
                <Col key={idx} xs={6} sm={4} md={3} lg={2}>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>{insignia.nombre}</strong><br />
                        {insignia.descripcion}<br />
                        <small>{insignia.fecha}</small>
                      </Tooltip>
                    }
                  >
                    <div
                      className="p-3 border rounded bg-light shadow-sm"
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      onClick={() => setInsigniaSeleccionada(insignia)}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <div style={{ fontSize: '2rem' }}>{insignia.emoji}</div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{insignia.nombre}</div>
                    </div>
                  </OverlayTrigger>
                </Col>
              ))}
            </Row>

            {insigniaSeleccionada && (
              <Modal show onHide={() => setInsigniaSeleccionada(null)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{insigniaSeleccionada.emoji} {insigniaSeleccionada.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p><strong>Instrumento:</strong> {insigniaSeleccionada.instrumento}</p>
                  <p><strong>Fecha:</strong> {insigniaSeleccionada.fecha}</p>
                  <p><strong>Descripción:</strong><br />{insigniaSeleccionada.descripcion}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://musica.upeu.edu.pe/logros/${encodeURIComponent(insigniaSeleccionada.nombre)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    Compartir en LinkedIn
                  </Button>
                  <Button variant="secondary" onClick={() => setInsigniaSeleccionada(null)}>Cerrar</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Tab>
        </Tabs>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => setData(generarDataAleatoria())}>
            🎲 Variar Datos
          </Button>
        </div>
      </Card>
    </Container>
  );
}
