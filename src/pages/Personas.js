// src/components/Personas.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Personas() {
  const [personas, setPersonas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    inicializarDatos();
    cargar();
  }, []);

  const inicializarDatos = () => {
    if (!localStorage.getItem('personas')) {
      const personasFicticias = [
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
      localStorage.setItem('personas', JSON.stringify(personasFicticias));
    }
  };

  const cargar = () => {
    const data = JSON.parse(localStorage.getItem('personas') || '[]');
    setPersonas(data);
  };

  const abrirEdicion = (p) => {
    setEditando(p);
    setForm({ ...p });
  };

  const cerrarModal = () => {
    setEditando(null);
    setForm({});
  };

  const guardarCambios = () => {
    const todas = JSON.parse(localStorage.getItem('personas') || '[]');
    const actualizadas = todas.map(p => p.id === form.id ? form : p);
    localStorage.setItem('personas', JSON.stringify(actualizadas));
    cerrarModal();
    cargar();
  };

  return (
    <div>
      <h4>Listado de Personas</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.numero}</td>
              <td>{p.telefono}</td>
              <td>{p.email}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => abrirEdicion(p)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!editando} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={form.nombre || ''} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Número</Form.Label>
              <Form.Control value={form.numero || ''} onChange={(e) => setForm({ ...form, numero: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control value={form.telefono || ''} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Dirección</Form.Label>
              <Form.Control value={form.direccion || ''} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
          <Button variant="primary" onClick={guardarCambios}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Personas;
