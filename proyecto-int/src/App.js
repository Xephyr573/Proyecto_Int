import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";


// Home principal
import Home from './pages/main/Home';


// Logins
import Estudiante from "./pages/homepage/Estudiante/Estudiante";
import Docente from "./pages/homepage/Docente/Docente";
import Asesor from "./pages/homepage/Asesor/Asesor"

// Dashboards
import EstudianteDashboard from './pages/homepage/Estudiante/EstudianteDashboard';
import DocenteDashboard from './pages/homepage/Docente/DocenteDashboard';



// Subrutas Estudiante
import PerfilEstudiante from './pages/homepage/Estudiante/pages/PerfilEstudiante';
import AsistenciaEstudiante from './pages/homepage/Estudiante/pages/AsistenciaEstudiante';
import SolicitudesEstudiante from './pages/homepage/Estudiante/pages/SolicitudesEstudiante';
import ReporteEstudiante from './pages/homepage/Estudiante/pages/ReporteEstudiante';
import NecesidadesEspeciales from './pages/homepage/Estudiante/pages/NecesidadesEspeciales';
import EntrevistaEstudiante from './pages/homepage/Estudiante/pages/EntrevistaEstudiante';
// Subrutas Docente
import PerfilDocente from './pages/homepage/Docente/pages/PerfilDocente';
import AsistenciaDocente from './pages/homepage/Docente/pages/AsistenciaEstudiantes';
import SolicitudesRecibidas from './pages/homepage/Docente/pages/SolicitudesRecibidas';
import ReportesDocente from './pages/homepage/Docente/pages/ReportesDocente';

// Subrutas Director

// Subrutas Asesor



// ---- Rutas ----
function App() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    //Se hara la peticion a la API de Django
    axios.get('http://127.0.0.1:8000/api/hello')
    .then(response => {
      //response.data contiene el JSON que enviamos desde el Django
      setMessage(response.data.message + " " + response.data.user);
    })
    .catch(error => {
      console.error("Hubo un error al cargar los datos:",error);
      setMessage("Error al conectar con la API");
    });
  }, []); //El arrary vacio [] significa que esto se ejecutara 1 vez al montar el componente
  return (
    <BrowserRouter>
      <Routes>

        {/* Home principal */}
        <Route path="/" element={<Home />} />

        {/* ------ Logins ------ */}
        <Route path="/Estudiante" element={<Estudiante />} />
        <Route path="/Docente" element={<Docente />} />
        <Route path="/Director" element={<Director />} />
        <Route path="/Asesor" element={<Asesor />} />

        {/* ------ Dashboard ------ */}
        <Route path="/EstudianteDashboard" element={<EstudianteDashboard />} />
        <Route path="/DocenteDashboard" element={<DocenteDashboard />} />
        <Route path="/DirectorDashboard" element={<DirectorDashboard />} />
        <Route path="/AsesorDashboard" element={<AsesorDashboard />} />
        {/* ------ Subrutas Estudiante ------ */}
        <Route path="/estudiante/perfil" element={<PerfilEstudiante />} />
        <Route path="/estudiante/asistencia" element={<AsistenciaEstudiante />} />
        <Route path="/estudiante/solicitudes" element={<SolicitudesEstudiante />} />
        <Route path="/estudiante/reporte" element={<ReporteEstudiante />} />
        <Route path="/estudiante/necesidades" element={<NecesidadesEspeciales />} /> 
        <Route path="/estudiante/entrevista" element={<EntrevistaEstudiante />} />
        {/* ------ Subrutas Docente ------ */}
        <Route path="/docente/perfil" element={<PerfilDocente />} />
        <Route path="/docente/asistencia" element={<AsistenciaDocente />} />
        <Route path="/docente/solicitudes" element={<SolicitudesRecibidas />} />
        <Route path="/docente/reportes" element={<ReportesDocente />} />
        {/* ------ Subrutas Director ------ */}



        {/* ------ Subrutas Asesor ------ */}
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;