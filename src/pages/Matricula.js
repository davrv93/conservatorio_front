import React, { useEffect, useState } from 'react';
import { Button, ProgressBar, Badge } from 'react-bootstrap';
import Admission from './Admission';
import CourseSelection from './CourseSelection';
import Payment from './Payment';
import Encuesta from './Encuesta';
import { BookOpen, PersonStanding, CreditCard, ClipboardEdit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';

function Matricula() {
  const [pasos, setPasos] = useState([]);
  const [indice, setIndice] = useState(0);
  const [data, setData] = useState({});
  const [completo, setCompleto] = useState(false);
  const [matricula, setMatricula] = useState(null);

  const { id, paso } = useParams();
  const navigate = useNavigate();
  const matriculaId = id;

  useEffect(() => {
    if (matriculaId) {
      cargarMatriculaYFlujo();
    }
  }, [matriculaId]);

  useEffect(() => {
    if (pasos.length && paso) {
      const idx = pasos.findIndex(p => p.codigo === paso);
      if (idx >= 0) setIndice(idx);
    }
  }, [pasos, paso]);

  const cargarMatriculaYFlujo = async () => {
    const mats = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const m = mats.find(mat => mat.id === matriculaId);
    if (!m) return alert("❌ Matrícula no encontrada.");
    setMatricula(m);
    setData(prev => ({ ...prev, persona: { codigo: m.personaCodigo } }));

    const pasosPorPeriodo = JSON.parse(localStorage.getItem('pasos') || '[]')
      .filter(p => p.periodoId === m.periodoId);
    setPasos(pasosPorPeriodo);
  };

  const actualizarPasoActual = (pasoNombre) => {
    const todas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const actualizadas = todas.map(m => m.id === matriculaId ? { ...m, pasoActual: pasoNombre } : m);
    localStorage.setItem('matriculas', JSON.stringify(actualizadas));
  };

  const saveBitacoraPaso = (registro) => {
    const bitacora = JSON.parse(localStorage.getItem('bitacora') || '[]');
    bitacora.push(registro);
    localStorage.setItem('bitacora', JSON.stringify(bitacora));
  };

  const avanzar = () => {
    const pasoNombre = pasos[indice]?.nombre || '';
    saveBitacoraPaso({
      personaCodigo: data?.persona?.codigo || '',
      paso: pasoNombre,
      timestamp: new Date().toISOString()
    });
    actualizarPasoActual(pasoNombre);

    if (indice < pasos.length - 1) {
      navigate(`/matricula/${matriculaId}/${pasos[indice + 1].codigo}`);
    } else {
      setCompleto(true);
    }
  };

  const retroceder = () => {
    if (indice > 0) {
      navigate(`/matricula/${matriculaId}/${pasos[indice - 1].codigo}`);
    }
  };

  const handleSelect = (info) => {
    const nuevaId = uuidv4();
    const periodoId = parseInt(localStorage.getItem('periodoActual'));
    const nuevaMatricula = {
      id: nuevaId,
      personaCodigo: info.codigo,
      fecha: new Date().toISOString(),
      estado: 'en_proceso',
      pasoActual: pasos[0]?.nombre || '',
      periodoId: periodoId
    };
    const todas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    todas.push(nuevaMatricula);
    localStorage.setItem('matriculas', JSON.stringify(todas));

    setData({ persona: info });
    navigate(`/matricula/${nuevaId}/${pasos[1]?.codigo || pasos[0]?.codigo}`);
  };

  const handleCursoSelect = (curso) => {
    const mats = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const actualizadas = mats.map(m =>
      m.id === matriculaId ? { ...m, ...curso } : m
    );
    localStorage.setItem('matriculas', JSON.stringify(actualizadas));
  };

  const getComponente = (nombre) => {
    const comp = {
      'Admisión': <Admission onSelect={handleSelect} />,
      'Selección de Curso': <CourseSelection persona={data.persona} onCursoSelect={handleCursoSelect} />,
      'Pago': <Payment persona={data.persona} />,
      'Encuesta': <Encuesta persona={data.persona} />
    };
    return comp[nombre] || <div>Formulario para "{nombre}" no implementado.</div>;
  };

  const iconoPaso = {
    'Admisión': <PersonStanding size={18} className="me-1" />,
    'Selección de Curso': <BookOpen size={18} className="me-1" />,
    'Pago': <CreditCard size={18} className="me-1" />,
    'Encuesta': <ClipboardEdit size={18} className="me-1" />
  };

  const colorPaso = {
    'Admisión': 'primary',
    'Selección de Curso': 'info',
    'Pago': 'success',
    'Encuesta': 'warning'
  };

  if (!pasos.length) return <p>Cargando flujo...</p>;
  if (completo) return <h4 className="text-success">✅ Matrícula finalizada</h4>;

  const pasoActual = pasos[indice];

  return (
    <div>
      <div className="d-flex mb-3 flex-wrap gap-2">
        {pasos.map((p, i) => (
          <Badge key={i} bg={colorPaso[p.nombre] || 'secondary'} pill className={i === indice ? 'px-3 py-2 fs-6' : 'px-3 py-2'}>
            {iconoPaso[p.nombre]} {p.nombre}
          </Badge>
        ))}
      </div>
      <ProgressBar now={(indice + 1) * 100 / pasos.length} className="mb-3" />
      {getComponente(pasoActual.nombre)}
      <div className="mt-4 d-flex justify-content-between">
        <Button disabled={indice === 0} onClick={retroceder}>Anterior</Button>
        <Button onClick={avanzar}>{indice < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}</Button>
      </div>
    </div>
  );
}

export default Matricula;
