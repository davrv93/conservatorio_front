// src/components/MatriculaCrud.js
import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Row, Col, Button, Pagination, Card } from 'react-bootstrap';

function MatriculaCrud() {
  const [matriculas, setMatriculas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [personasMap, setPersonasMap] = useState({});
  const itemsPorPagina = 10;

  useEffect(() => {
    inicializarDatos();
    cargarDatos();
  }, []);

  const inicializarDatos = () => {
    if (!localStorage.getItem('personas')) {
      const personas = [
        {
          id: 'c9836c10-1d46-11ee-be56-0242ac120002',
          codigo: 'A001',
          nombre: 'Juan Pérez',
          numero: '12345678',
          telefono: '987654321',
          email: 'juan@upeu.edu.pe',
          direccion: 'Av. Siempre Viva 123'
        },
        {
          id: 'c9836e02-1d46-11ee-be56-0242ac120002',
          codigo: 'A002',
          nombre: 'María López',
          numero: '87654321',
          telefono: '912345678',
          email: 'maria@upeu.edu.pe',
          direccion: 'Calle Falsa 456'
        },
        {
          id: 'c9836f94-1d46-11ee-be56-0242ac120002',
          codigo: 'A003',
          nombre: 'Carlos Gómez',
          numero: '11223344',
          telefono: '923456789',
          email: 'carlos@upeu.edu.pe',
          direccion: 'Jr. Ilusión 789'
        }
      ];
      localStorage.setItem('personas', JSON.stringify(personas));
    }

    if (!localStorage.getItem('matriculas')) {
      const matriculas = [
        {
          id: 'm1',
          personaId: 'c9836c10-1d46-11ee-be56-0242ac120002',
          curso: 'Violín Básico',
          grupo: 'A',
          docente: 'Lic. Sandra Gómez',
          precio: 300,
          fecha: '2025-01-10T00:00:00Z',
          pasoActual: 'Admisión'
        },
        {
          id: 'm2',
          personaId: 'c9836e02-1d46-11ee-be56-0242ac120002',
          curso: 'Piano Avanzado',
          grupo: 'B',
          docente: 'Mtro. Juan Rivera',
          precio: 450,
          fecha: '2025-01-11T00:00:00Z',
          pasoActual: 'Selección de Curso'
        }
      ];
      localStorage.setItem('matriculas', JSON.stringify(matriculas));
    }

    if (!localStorage.getItem('pasos')) {
      const pasos = [
        { codigo: 'admi', nombre: 'Admisión' },
        { codigo: 'curso', nombre: 'Selección de Curso' },
        { codigo: 'pago', nombre: 'Pago' },
        { codigo: 'encuesta', nombre: 'Encuesta' }
      ];
      localStorage.setItem('pasos', JSON.stringify(pasos));
    }
  };

  const cargarDatos = () => {
    const personas = JSON.parse(localStorage.getItem('personas') || '[]');
    const personasMap = Object.fromEntries(personas.map(p => [p.id, p]));
    setPersonasMap(personasMap);

    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    setMatriculas(matriculas);
    setFiltradas(matriculas);
  };

  const filtrar = () => {
    const resultado = matriculas.filter(m =>
      (!filtroNombre || (personasMap[m.personaId]?.nombre || '').toLowerCase().includes(filtroNombre.toLowerCase())) &&
      (!filtroCurso || (m.curso || '').toLowerCase().includes(filtroCurso.toLowerCase()))
    );
    setFiltradas(resultado);
    setPaginaActual(1);
  };

  const eliminarFiltro = () => {
    setFiltroNombre('');
    setFiltroCurso('');
    setFiltradas(matriculas);
    setPaginaActual(1);
  };

  const totalPaginas = Math.ceil(filtradas.length / itemsPorPagina);
  const desde = (paginaActual - 1) * itemsPorPagina;
  const hasta = desde + itemsPorPagina;
  const paginaActualData = filtradas.slice(desde, hasta);

  const pasos = JSON.parse(localStorage.getItem('pasos') || '[]');
  const pasosMap = Object.fromEntries(pasos.map(p => [p.nombre, p.codigo]));

  return (
    <Container className="px-4">
      <h3 className="my-4 text-primary">Gestión de Matrículas</h3>

      <Card className="mb-4 shadow-sm">
        <Card.Body style={{ background: '#f3f7ff' }}>
          <Row className="g-2">
            <Col md={5}>
              <Form.Control
                placeholder="Buscar por nombre"
                value={filtroNombre}
                onChange={e => setFiltroNombre(e.target.value)}
              />
            </Col>
            <Col md={5}>
              <Form.Control
                placeholder="Buscar por curso"
                value={filtroCurso}
                onChange={e => setFiltroCurso(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={filtrar}>Filtrar</Button>
                <Button variant="outline-secondary" onClick={eliminarFiltro}>Eliminar Filtro</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table bordered hover className="table-striped align-middle mb-0">
          <thead style={{ background: 'linear-gradient(90deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Curso</th>
              <th>Grupo</th>
              <th>Docente</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th>Paso Actual</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginaActualData.map((m, i) => (
              <tr key={m.id}>
                <td>{personasMap[m.personaId]?.nombre}</td>
                <td>{personasMap[m.personaId]?.codigo}</td>
                <td>{m.curso}</td>
                <td>{m.grupo}</td>
                <td>{m.docente}</td>
                <td>S/ {m.precio}</td>
                <td>{m.fecha?.split('T')[0]}</td>
                <td>{m.pasoActual}</td>
                <td>
                  {pasosMap[m.pasoActual] ? (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={`/matricula/${m.id}/${pasosMap[m.pasoActual]}`}
                    >
                      Continuar
                    </Button>
                  ) : (
                    <span className="text-muted">Sin ruta</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination>
          <Pagination.First disabled={paginaActual === 1} onClick={() => setPaginaActual(1)} />
          <Pagination.Prev disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)} />
          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter(p => {
              const min = Math.max(1, paginaActual - 2);
              const max = Math.min(totalPaginas, min + 3);
              return p >= min && p <= max;
            })
            .map(p => (
              <Pagination.Item key={p} active={p === paginaActual} onClick={() => setPaginaActual(p)}>
                {p}
              </Pagination.Item>
            ))}
          <Pagination.Next disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)} />
          <Pagination.Last disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(totalPaginas)} />
        </Pagination>
      </div>
    </Container>
  );
}

export default MatriculaCrud;
