import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  LineChart, Line,
  BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#AAEECC'];

function Dashboard() {
  // Datos estáticos
  const resumen = {
    alumnosMes: 125,
    cursosActivos: 18,
    ingresos: 10500
  };

  const data = [
    { fecha: '2025-06-01', total: 5 },
    { fecha: '2025-06-02', total: 12 },
    { fecha: '2025-06-03', total: 20 },
    { fecha: '2025-06-04', total: 17 },
    { fecha: '2025-06-05', total: 10 },
    { fecha: '2025-06-06', total: 8 },
    { fecha: '2025-06-07', total: 15 }
  ];

  const pasosData = [
    { name: 'Registro', value: 40 },
    { name: 'Asignación', value: 30 },
    { name: 'Evaluación', value: 20 },
    { name: 'Finalizado', value: 10 }
  ];

  const nivelesInstrumentosData = [
    { periodo: '2025-1', Básico: 40, Intermedio: 30, Avanzado: 20 },
    { periodo: '2025-2', Básico: 50, Intermedio: 35, Avanzado: 25 }
  ];

  const distribucionInstrumentos = [
    { categoria: 'Piano', cantidad: 60 },
    { categoria: 'Guitarra', cantidad: 45 },
    { categoria: 'Violín', cantidad: 30 }
  ];

  const satisfaccion = [
    { nivel: 'Excelente', value: 55 },
    { nivel: 'Bueno', value: 30 },
    { nivel: 'Regular', value: 10 },
    { nivel: 'Malo', value: 5 }
  ];

  const evaluacionesData = [
    { periodo: '2025-1', cantidad: 20 },
    { periodo: '2025-2', cantidad: 30 },
    { periodo: '2026-1', cantidad: 25 }
  ];

  const retirosData = [
    { periodo: '2025-1', piano: 3, guitarra: 1 },
    { periodo: '2025-2', piano: 2, guitarra: 4 },
    { periodo: '2026-1', piano: 5, guitarra: 2 }
  ];

  return (
    <div>
      <h3>🎼 Panel de Control del Conservatorio</h3>

      <Card className="mt-3 mb-4">
        <Card.Body>
          <Card.Title>Resumen de Gestión</Card.Title>
          <Card.Text>
            Alumnos matriculados este mes: <strong>{resumen.alumnosMes}</strong><br />
            Cursos activos: <strong>{resumen.cursosActivos}</strong><br />
            Ingresos estimados: <strong>S/ {resumen.ingresos.toLocaleString()}</strong>
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Matrículas por Día</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="total" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="fecha" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>% de Alumnos por Paso</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pasosData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pasosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Distribución por Nivel Musical</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nivelesInstrumentosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Básico" fill="#0088FE" />
                  <Bar dataKey="Intermedio" fill="#00C49F" />
                  <Bar dataKey="Avanzado" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Estudiantes por Instrumento</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="cantidad"
                    data={distribucionInstrumentos}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {distribucionInstrumentos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Nivel de Satisfacción</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={satisfaccion}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {satisfaccion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Evaluaciones por Suficiencia</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={evaluacionesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#6f42c1" name="Evaluaciones por Suficiencia" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Retiros por Instrumento</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retirosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="piano" fill="#00C49F" name="Piano" />
                  <Bar dataKey="guitarra" fill="#FF8042" name="Guitarra" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
