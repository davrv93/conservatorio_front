import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup, Alert, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Admission({ onSelect }) {
  const [personas, setPersonas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('nombre');
  const [seleccionada, setSeleccionada] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [advertencia, setAdvertencia] = useState('');

  const { id: matriculaId } = useParams();

  useEffect(() => {
    inicializarPersonas();
    cargarPersonas();
  }, []);

  useEffect(() => {
    if (matriculaId) {
      const mats = JSON.parse(localStorage.getItem('matriculas') || '[]');
      const matricula = mats.find(m => m.id === matriculaId);

      if (matricula) {
        const personas = JSON.parse(localStorage.getItem('personas') || '[]');
        const persona = personas.find(p => p.id === matricula.personaId);
        if (persona) {
          setSeleccionada(persona);
          setAdvertencia('');
        } else {
          setAdvertencia(`❌ No se encontró persona para la matrícula "${matriculaId}".`);
        }
      } else {
        setAdvertencia(`❌ Matrícula con ID "${matriculaId}" no encontrada.`);
      }
    }
  }, [matriculaId]);

  const inicializarPersonas = () => {
    if (!localStorage.getItem('personas')) {
      const personasFicticias = [
        { id: 'p1', codigo: 'A001', nombre: 'Juan Pérez', numero: '12345678', telefono: '987654321', email: 'juan@upeu.edu.pe' },
        { id: 'p2', codigo: 'A002', nombre: 'María López', numero: '87654321', telefono: '912345678', email: 'maria@upeu.edu.pe' },
        { id: 'p3', codigo: 'A003', nombre: 'Carlos Gómez', numero: '11223344', telefono: '923456789', email: 'carlos@upeu.edu.pe' }
      ];
      localStorage.setItem('personas', JSON.stringify(personasFicticias));
    }
  };

  const cargarPersonas = () => {
    const data = JSON.parse(localStorage.getItem('personas') || '[]');
    setPersonas(data);
  };

  const buscar = () => {
    const lista = personas.filter(p =>
      p[filtro]?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(lista);
  };

  const elegir = (p) => {
    setSeleccionada(p);
    setAdvertencia('');
  };

  const limpiarSeleccion = () => {
    setSeleccionada(null);
    setBusqueda('');
    setResultados([]);
  };

  return (
    <div>
      <h4>Buscar persona</h4>

      {!seleccionada && (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Filtro</Form.Label>
            <Form.Select value={filtro} onChange={e => setFiltro(e.target.value)}>
              <option value="nombre">Nombre</option>
              <option value="codigo">Código</option>
              <option value="numero">N° Documento</option>
            </Form.Select>
          </Form.Group>

          <Form.Control
            type="text"
            value={busqueda}
            placeholder="Escribe para buscar..."
            onChange={(e) => setBusqueda(e.target.value)}
            className="mb-2"
          />

          <Button variant="primary" className="mb-3 me-2" onClick={buscar}>Buscar</Button>
        </>
      )}

      {seleccionada && (
        <Button variant="outline-secondary" className="mb-3" onClick={limpiarSeleccion}>
          Limpiar selección
        </Button>
      )}

      {advertencia && <Alert variant="danger">{advertencia}</Alert>}

      {!seleccionada && (
        <ListGroup>
          {resultados.map((p, i) => (
            <ListGroup.Item
              key={i}
              action
              onClick={() => elegir(p)}
            >
              <strong>{p.nombre}</strong> - {p.codigo}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {seleccionada && (
        <div className="mt-4">
          <h5 className="text-success">✅ Persona seleccionada</h5>
          <ul>
            <li><strong>Nombre:</strong> {seleccionada.nombre}</li>
            <li><strong>Código:</strong> {seleccionada.codigo}</li>
            <li><strong>Documento:</strong> {seleccionada.numero}</li>
            <li><strong>Teléfono:</strong> {seleccionada.telefono}</li>
            <li><strong>Email:</strong> {seleccionada.email}</li>
          </ul>
        </div>
      )}

      <div className="mt-5">
        <Alert variant="info">
          <h6 className="mb-1">ℹ️ Módulo con datos de prueba</h6>
          <p className="mb-2" style={{ fontSize: '0.9rem' }}>
            * Puedes buscar por: <strong>nombre</strong>, <strong>código</strong> o <strong>N° documento</strong>.<br />
            * Datos simulados cargados desde <code>localStorage</code>.
          </p>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>N° Documento</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{p.numero}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Alert>
      </div>
    </div>
  );
}

export default Admission;
