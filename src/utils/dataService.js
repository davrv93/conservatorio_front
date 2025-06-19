const BACKEND_ENABLED = localStorage.getItem('modo') === 'backend';
const API_URL = 'http://localhost:4000';

export const getPersonas = async () => {
  if (BACKEND_ENABLED) {
    console.log('1');
    const res = await fetch(`${API_URL}/personas`);
    return res.json();
  } else {
    console.log('2');

    const data = localStorage.getItem('personas') || '[]';
    return JSON.parse(data);
  }
};
export const createCurso = async (curso) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/cursos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso)
    });
    return res.json();
  } else {
    const data = JSON.parse(localStorage.getItem('cursos') || '[]');
    data.push(curso);
    localStorage.setItem('cursos', JSON.stringify(data));
    return curso;
  }
};

export const savePersona = async (persona) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/personas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(persona)
    });
    return res.json();
  } else {
    const personas = JSON.parse(localStorage.getItem('personas') || '[]');
    personas.push(persona);
    localStorage.setItem('personas', JSON.stringify(personas));
    return persona;
  }
};

export const getMatriculas = async (codigo) => {
  if (BACKEND_ENABLED) {
    console.log('1')
    const res = await fetch(`${API_URL}/matriculas/${codigo}`);
    console.log(res);
    return res.json();
  } else {
    console.log('2')

    const data = localStorage.getItem('matriculas') || '[]';
    return JSON.parse(data).filter(m => m.personaCodigo === codigo);
  }
};

export const getMatricula = async (id) => {
  const res = await fetch(`http://localhost:4000/matriculas/${id}`);
  return res.json();
};

export const getAllMatriculas = async () => {
  const res = await fetch('http://localhost:4000/matriculas');
  return await res.json();
};

export async function getEstadisticasLineas() {
  const res = await fetch(`${API_URL}/estadisticas/lineas`);
  return res.json();
}

export async function getEstadisticasPasos() {
  const res = await fetch(`${API_URL}/estadisticas/pasos`);
  return res.json();
}

export const getEstadisticasResumen = async () => {
  const res = await fetch(`${API_URL}/estadisticas/resumen`);
  return res.json();
};

export const getPeriodos = () => fetch(API_URL + '/periodos').then(r => r.json());
export const crearPeriodo = (nombre) =>
  fetch(API_URL + '/periodos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  }).then(r => r.json());

export const setPeriodoActual = (id) =>
  fetch(API_URL + `/periodos/${id}/actual`, {
    method: 'PATCH'
  }).then(r => r.json());

export const getPeriodoActual = () =>
  fetch(API_URL + '/periodos/actual').then(r => r.json());



export const saveMatricula = async (matricula) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/matriculas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matricula)
    });
    return res.json();
  } else {
    const data = JSON.parse(localStorage.getItem('matriculas') || '[]');
    data.push(matricula);
    localStorage.setItem('matriculas', JSON.stringify(data));
    return matricula;
  }
};

export const getCursos = async () => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/cursos`);
    return res.json();
  } else {
    const data = localStorage.getItem('cursos') || '[]';
    return JSON.parse(data);
  }
};

export const saveCurso = async (curso) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/cursos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso)
    });
    return res.json();
  } else {
    const data = JSON.parse(localStorage.getItem('cursos') || '[]');
    data.push(curso);
    localStorage.setItem('cursos', JSON.stringify(data));
    return curso;
  }
};

export const getPasos = async (periodoId) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/pasos?periodoId=${periodoId}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } else {
    const data = localStorage.getItem('flujoMatricula') || '[]';
    return JSON.parse(data);
  }
};

export const savePaso = async (paso) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/pasos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paso)
    });
    return res.json();
  } else {
    const data = JSON.parse(localStorage.getItem('flujoMatricula') || '[]');
    data.push(paso);
    localStorage.setItem('flujoMatricula', JSON.stringify(data));
    return paso;
  }
};

export const deletePaso = async (id, indexLocal) => {
  if (BACKEND_ENABLED) {
    const res = await fetch(`${API_URL}/pasos/${id}`, { method: 'DELETE' });
    return res.json();
  } else {
    const pasos = JSON.parse(localStorage.getItem('flujoMatricula') || '[]');
    pasos.splice(indexLocal, 1);
    localStorage.setItem('flujoMatricula', JSON.stringify(pasos));
    return { success: true };
  }
};

export async function saveBitacoraPaso(data) {
  if (!BACKEND_ENABLED) {
    const logs = JSON.parse(localStorage.getItem('bitacora') || '[]');
    logs.push(data);
    localStorage.setItem('bitacora', JSON.stringify(logs));
    return data;
  } else {
    const res = await fetch(`${API_URL}/bitacora`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
}
