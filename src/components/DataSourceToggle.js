
// src/components/DataSourceToggle.js
import React, { useState, useEffect } from 'react';

const DataSourceToggle = () => {
  const [useBackend, setUseBackend] = useState(localStorage.getItem('useBackend') === 'true');

  const toggle = () => {
    const updated = !useBackend;
    localStorage.setItem('useBackend', updated);
    setUseBackend(updated);
    window.location.reload();
  };

  return (
    <div className='text-end mb-3'>
      <small>Fuente de datos: <strong>{useBackend ? 'Backend' : 'LocalStorage'}</strong></small>
      <button className='btn btn-sm btn-outline-primary ms-2' onClick={toggle}>
        Cambiar
      </button>
    </div>
  );
};

export default DataSourceToggle;
