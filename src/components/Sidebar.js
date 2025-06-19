
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/personas', label: 'Personas' },
    { path: '/courses', label: 'Cursos' },
    { path: '/matriculas', label: 'Matrículas' },
    { path: '/bitacora', label: 'Bitácora' },
    { path: '/config', label: 'Configuración' },
    { path: '/registrar-curso', label: 'Registrar Curso' },
    { path: '/configurar-horario', label: 'Configurar horario' },
    { path: '/lanzador-matriculas', label: 'Launcher' },
    { path: '/reportes', label: 'Reportes' },
    { path: '/gestion', label: 'Gestión de programas' }

  ];

  return (
    <div className='sidebar bg-light p-3'>
      <h5 className='text-center'>Módulos</h5>
      <ul className='nav flex-column'>
        {menuItems.map(item => (
          <li className='nav-item' key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active fw-bold text-primary' : '')
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
