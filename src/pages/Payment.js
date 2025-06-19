import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

function Payment({ persona }) {
  const [matricula, setMatricula] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams(); // ID de matrícula

  useEffect(() => {
    if (!persona || !id) return;

    const todas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const m = todas.find(m => m.id === id);
    if (m) setMatricula(m);
  }, [persona, id]);

  const generarPDF = () => {
    if (!matricula || !persona) return;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('RONCAL VIDAL SAMUEL DAVID', 10, 10);
    doc.text('RUC: 10480547255', 10, 18);
    doc.text('BOLETA DE PAGO', 10, 28);
    doc.text(`Fecha: ${new Date(matricula.fecha).toLocaleDateString()}`, 10, 36);
    doc.text(`Alumno: ${persona.nombre}`, 10, 46);
    doc.text(`Código: ${persona.codigo}`, 10, 54);
    doc.text(`Curso: ${matricula.curso}`, 10, 64);
    doc.text(`Docente: ${matricula.docente}`, 10, 72);
    doc.text(`Grupo: ${matricula.grupo}`, 10, 80);
    doc.text(`Monto: S/ ${matricula.precio}`, 10, 90);
    doc.text('Gracias por su preferencia.', 10, 110);
    doc.save(`boleta_pago_${persona.codigo}.pdf`);
  };

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  return (
    <div>
      <h3>Resumen de Pago</h3>

      {!persona ? (
        <p className="text-danger">Usuario no encontrado.</p>
      ) : matricula ? (
        <>
          <Card className="shadow border-success mt-3">
            <Card.Body>
              <Card.Title className="text-success">{persona.nombre}</Card.Title>
              <Card.Text>
                <strong>Curso:</strong> {matricula.curso}<br />
                <strong>Docente:</strong> {matricula.docente}<br />
                <strong>Grupo:</strong> {matricula.grupo}<br />
                <strong>Precio:</strong> S/ {matricula.precio}<br />
                <strong>Fecha:</strong> {new Date(matricula.fecha).toLocaleDateString()}
              </Card.Text>
              <div className="d-flex gap-2">
                <Button variant='info' onClick={abrirModal}>
                  Ver Comprobante de Pago
                </Button>
                <Button variant='success' onClick={generarPDF}>
                  Descargar PDF
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Modal Boleta */}
          <Modal show={showModal} onHide={cerrarModal} centered size="md">
            <Modal.Header closeButton>
              <Modal.Title>Boleta Electrónica</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 className="text-center mb-2">RONCAL VIDAL SAMUEL DAVID</h5>
              <p className="text-center mb-1">RUC: 10480547255</p>
              <p className="text-center text-muted">Boleta de Pago</p>

              <hr />
              <p><strong>Fecha de Emisión:</strong> {new Date(matricula.fecha).toLocaleDateString()}</p>
              <p><strong>Alumno:</strong> {persona.nombre} ({persona.codigo})</p>

              <Table bordered size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th className="text-end">Monto (S/)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{matricula.curso} - Grupo {matricula.grupo} / {matricula.docente}</td>
                    <td className="text-end">{matricula.precio}</td>
                  </tr>
                  <tr>
                    <td className="text-end"><strong>Total</strong></td>
                    <td className="text-end"><strong>{matricula.precio}</strong></td>
                  </tr>
                </tbody>
              </Table>

              <p className="mt-4 text-center text-muted">Gracias por su confianza en nuestro Conservatorio.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p className="text-muted">No se encontró matrícula registrada para este estudiante.</p>
      )}
    </div>
  );
}

export default Payment;
