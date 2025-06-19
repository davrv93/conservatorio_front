
import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { getMatriculas, getPersonas } from '../utils/dataService';

function Enrollments() {
  const [codigo, setCodigo] = useState('');
  const [resultados, setResultados] = useState([]);
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    async function cargar() {
      const lista = await getPersonas();
      setPersonas(lista);
    }
    cargar();
  }, []);

  const buscar = async () => {
    const mats = await getMatriculas(codigo);
    setResultados(mats);
  };

  return (
    <div>
      <h3>Historial de Matrículas</h3>
      <Form className='mb-3'>
        <Form.Control
          placeholder='Código de persona'
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
        />
        <button className='btn btn-primary mt-2' onClick={buscar} type='button'>Buscar</button>
      </Form>

      {resultados.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr><th>Curso</th><th>Grupo</th><th>Docente</th><th>Precio</th><th>Fecha</th></tr>
          </thead>
          <tbody>
            {resultados.map((m, i) => (
              <tr key={i}>
                <td>{m.curso}</td>
                <td>{m.grupo}</td>
                <td>{m.docente}</td>
                <td>S/ {m.precio}</td>
                <td>{m.fecha}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Enrollments;
