import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';

function Toolbar() {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {
    nombre: 'Usuario Invitado'
  };

  const getIniciales = (nombre) => {
    const partes = nombre.split(' ');
    const iniciales = partes.slice(0, 2).map(p => p[0]?.toUpperCase()).join('');
    return iniciales || '?';
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Navbar style={{ background: 'linear-gradient(90deg, #4e54c8, #8f94fb)' }} variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="text-white fw-bold">Conservatorio</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="d-flex align-items-center text-white text-decoration-none">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  background: '#5e60ce',
                  borderRadius: '50%',
                  color: '#fff',
                  marginRight: 8
                }}
              >
                <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="16" fontFamily="Arial">
                  {getIniciales(usuario.nombre)}
                </text>
              </svg>
              <span className="me-2">{usuario.nombre}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Toolbar;
