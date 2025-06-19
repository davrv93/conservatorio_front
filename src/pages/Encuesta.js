
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function Encuesta() {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [enviado, setEnviado] = useState(false);

  const enviar = () => {
    if (!p1 || !p2) return;
    console.log('Respuestas encuesta:', { p1, p2, comentarios });
    setEnviado(true);
  };

  return (
    <div>
      <h4>Encuesta de Satisfacción</h4>
      {enviado && <Alert variant="success">¡Gracias por tu retroalimentación!</Alert>}
      {!enviado && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>¿Cómo calificarías el proceso de matrícula?</Form.Label>
            <Form.Select value={p1} onChange={(e) => setP1(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option>Excelente</option>
              <option>Bueno</option>
              <option>Regular</option>
              <option>Malo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>¿Recomendarías este sistema a otros?</Form.Label>
            <Form.Select value={p2} onChange={(e) => setP2(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option>Sí</option>
              <option>No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comentarios adicionales</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            />
          </Form.Group>

          <Button onClick={enviar}>Enviar Encuesta</Button>
        </Form>
      )}
    </div>
  );
}

export default Encuesta;
