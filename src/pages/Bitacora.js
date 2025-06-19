
import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { getBitacora } from '../utils/dataService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Bitacora() {
  const [codigo, setCodigo] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    if (codigo.trim() === '') return;
    const data = await getBitacora(codigo.trim());
    setResultados(data);
  };

  
  const exportarPDF = () => {
    if (resultados.length === 0) return;
    const doc = new jsPDF();
    doc.text(`Bitácora de Matrícula - Persona: ${codigo}`, 10, 10);
    doc.autoTable({
      head: [['#', 'Paso', 'Fecha y Hora']],
      body: resultados.map((b, i) => [i + 1, b.paso, new Date(b.timestamp).toLocaleString()])
    });
    doc.save(`bitacora_${codigo}.pdf`);
  };

  return (
    <div>
      <h4>Bitácora de Matrícula</h4>
      <Form className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Código de persona"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
        />
        <Button className="ms-2" onClick={buscar}>Buscar</Button>
        <Button className="ms-2" variant="outline-success" onClick={() => exportarPDF()}>Exportar PDF</Button>
      </Form>

      {resultados.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Paso</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((b, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{b.paso}</td>
                <td>{new Date(b.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : <p>No hay registros para mostrar.</p>}
    </div>
  );
}

export default Bitacora;
