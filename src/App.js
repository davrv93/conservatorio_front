
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admission from './pages/Admission';
import AutoEnroll from './pages/AutoEnroll';
import CourseSelection from './pages/CourseSelection';
import Payment from './pages/Payment';
import Enrollments from './pages/Enrollments';
import Configuration from './pages/Configuration';
import Matricula from './pages/Matricula';
import MatriculaCrud from './pages/Matriculacrud';
import Personas from './pages/Personas';
import Toolbar from './components/Toolbar';
import CourseForm from './pages/CourseForm';
import HorarioConfig from './pages/HorarioConfig'; // Ajusta la ruta según tu estructura
import LanzadorMatriculas from './pages/LanzadorMatriculas'; // importa el nuevo componente
import ReporteHabilidadesMusico from './pages/ReporteHabilidadesMusico'; // importa el nuevo componente
import GestionProgramas from './pages/GestionProgramas';

function App() {
  return (
    <>
      <Toolbar />
      <Router basename="/conservatorio_front">
        <Layout>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admission' element={<Admission />} />
            <Route path='/auto-enroll' element={<AutoEnroll />} />
            <Route path='/courses' element={<CourseSelection />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/enrollments' element={<Enrollments />} />
            <Route path="/matricula/:id/:paso" element={<Matricula />} />
            <Route path='/matriculas' element={<MatriculaCrud />} />
            <Route path='/config' element={<Configuration />} />
            <Route path='/personas' element={<Personas />} />
            <Route path='/registrar-curso' element={<CourseForm />} />
            <Route path="/configurar-horario" element={<HorarioConfig />} />
            <Route path="/lanzador-matriculas" element={<LanzadorMatriculas />} />
            <Route path="/reportes" element={<ReporteHabilidadesMusico />} />
            <Route path="/gestion" element={<GestionProgramas />} />

          </Routes>
        </Layout>
      </Router>
    </> // ✅ CIERRA EL FRAGMENTO AQUÍ
  );
}  

export default App;
