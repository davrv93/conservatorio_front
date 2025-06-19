import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';

function CourseSelection({ persona, onCursoSelect }) {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [matriculasPrevias, setMatriculasPrevias] = useState([]);

  useEffect(() => {
    inicializarCursos();
    cargarCursosYMatriculas();
  }, [persona]);

  const inicializarCursos = () => {
    if (!localStorage.getItem('cursos')) {
      const cursosFicticios = [
        { nombre: 'Violín Inicial', grupo: 'A', docente: 'Maestro Vivaldi', precio: 150 },
        { nombre: 'Piano Básico', grupo: 'B', docente: 'Prof. Beethoven', precio: 180 },
        { nombre: 'Guitarra Clásica', grupo: 'C', docente: 'Dr. Segovia', precio: 160 },
        { nombre: 'Canto Coral', grupo: 'D', docente: 'Lic. Montserrat', precio: 140 },
      ];
      localStorage.setItem('cursos', JSON.stringify(cursosFicticios));
    }
  };

  const cargarCursosYMatriculas = () => {
    const cursosData = JSON.parse(localStorage.getItem('cursos') || '[]');
    setCursos(cursosData);

    if (persona) {
      const todas = JSON.parse(localStorage.getItem('matriculas') || '[]');
      const previas = todas.filter(m => m.personaId === persona.id);
      setMatriculasPrevias(previas.map(m => m.curso));
    }
  };

  const seleccionar = (curso) => {
    if (!persona) return setMensaje('Usuario no disponible');
    if (matriculasPrevias.includes(curso.nombre)) {
      return setMensaje('Ya llevaste este curso anteriormente.');
    }
    setCursoSeleccionado(curso);
    setMensaje('');
  };

  const confirmar = () => {
    if (!cursoSeleccionado || !persona) return;

    const nuevasMatriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const index = nuevasMatriculas.findIndex(m => m.personaId === persona.id);
    if (index >= 0) {
      nuevasMatriculas[index] = {
        ...nuevasMatriculas[index],
        curso: cursoSeleccionado.nombre,
        docente: cursoSeleccionado.docente,
        grupo: cursoSeleccionado.grupo,
        precio: cursoSeleccionado.precio,
        fecha: new Date().toISOString()
      };
      localStorage.setItem('matriculas', JSON.stringify(nuevasMatriculas));
    }

    if (onCursoSelect) {
      onCursoSelect(cursoSeleccionado);
    }

    setMensaje('✅ Curso matriculado exitosamente.');
    setMatriculasPrevias([...matriculasPrevias, cursoSeleccionado.nombre]);
    setCursoSeleccionado(null);
  };

  return (
    <div>
      <h3>Selección de Curso</h3>
      {mensaje && <Alert variant='info'>{mensaje}</Alert>}

      <Row>
        {cursos.map((curso, idx) => (
          <Col md={4} key={idx}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>{curso.nombre}</Card.Title>
                <Card.Text>
                  Grupo: {curso.grupo}<br />
                  Docente: {curso.docente}<br />
                  Precio: S/ {curso.precio}
                </Card.Text>
                <Button variant='outline-primary' onClick={() => seleccionar(curso)}>
                  Seleccionar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {cursoSeleccionado && persona && (
        <div className='mt-3'>
          <h5>Curso Seleccionado</h5>
          <p>{cursoSeleccionado.nombre} - Grupo {cursoSeleccionado.grupo}</p>
          <Button onClick={confirmar} variant='success'>Confirmar Matrícula</Button>
        </div>
      )}
    </div>
  );
}

export default CourseSelection;
