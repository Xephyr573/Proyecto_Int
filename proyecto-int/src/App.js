import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home principal
import Home from "./pages/main/Home";

// Logins
import Estudiante from "./pages/homepage/Estudiante/Estudiante";
import Docente from "./pages/homepage/Docente/Docente";
import Asesor from "./pages/homepage/Asesor/Asesor";

// Logins Asesor (carpeta Login)
import AsesorDirectoraLogin from "./pages/homepage/Asesor/Login/AsesorDirectoraLogin";
import AsesorCoordinadoraLogin from "./pages/homepage/Asesor/Login/AsesorPedagogicoLogin";
import AsesorInclusionLogin from "./pages/homepage/Asesor/Login/AsesorInclusionLogin";

// Flujo Asesor (carpeta flujo)
import SeguimientoCaso from "./pages/homepage/Asesor/pages/flujo/SeguimientoCaso";
import EvaluacionFinal from "./pages/homepage/Asesor/pages/flujo/EvaluacionFinal";

// Dashboards
import EstudianteDashboard from "./pages/homepage/Estudiante/EstudianteDashboard";
import DocenteDashboard from "./pages/homepage/Docente/DocenteDashboard";

// Subrutas Estudiante
import PerfilEstudiante from "./pages/homepage/Estudiante/pages/PerfilEstudiante";
import AsistenciaEstudiante from "./pages/homepage/Estudiante/pages/AsistenciaEstudiante";
import SolicitudesEstudiante from "./pages/homepage/Estudiante/pages/SolicitudesEstudiante";
import ReporteEstudiante from "./pages/homepage/Estudiante/pages/ReporteEstudiante";
import NecesidadesEspeciales from "./pages/homepage/Estudiante/pages/NecesidadesEspeciales";
import EntrevistaEstudiante from "./pages/homepage/Estudiante/pages/EntrevistaEstudiante";

// Subrutas Docente
import PerfilDocente from "./pages/homepage/Docente/pages/PerfilDocente";
import AsistenciaDocente from "./pages/homepage/Docente/pages/AsistenciaEstudiantes";
import SolicitudesRecibidas from "./pages/homepage/Docente/pages/SolicitudesRecibidas";
import ReportesDocente from "./pages/homepage/Docente/pages/ReportesDocente";

// Subrutas Asesor
import RegistrarCaso from "./pages/homepage/Asesor/pages/RegistrarCaso";
import DefinirAjustes from "./pages/homepage/Asesor/pages/DefinirAjustes";
import ValidarAjustes from "./pages/homepage/Asesor/pages/ValidarAjustes";


function App() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hello")
      .then((response) => {
        setMessage(response.data.message + " " + response.data.user);
      })
      .catch((error) => {
        console.error("Hubo un error al cargar los datos:", error);
        setMessage("Error al conectar con la API");
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home principal */}
        <Route path="/" element={<Home />} />

        {/* ------ Logins ------ */}
        <Route path="/Estudiante" element={<Estudiante />} />
        <Route path="/Docente" element={<Docente />} />
        <Route path="/Asesor" element={<Asesor />} />

        {/* ------ Logins Asesor Por Rol ------ */}
        <Route path="/AsesorDirectoraLogin" element={<AsesorDirectoraLogin />} />
        <Route path="/AsesorCoordinadoraLogin" element={<AsesorCoordinadoraLogin />} />
        <Route path="/AsesorInclusionLogin" element={<AsesorInclusionLogin />} />

        {/* ------ Dashboards ------ */}
        <Route path="/EstudianteDashboard" element={<EstudianteDashboard />} />
        <Route path="/DocenteDashboard" element={<DocenteDashboard />} />

        {/* ------ Subrutas Estudiante ------ */}
        <Route path="/estudiante/perfil" element={<PerfilEstudiante />} />
        <Route path="/estudiante/asistencia" element={<AsistenciaEstudiante />} />
        <Route path="/estudiante/solicitudes" element={<SolicitudesEstudiante />}/>
        <Route path="/estudiante/reporte" element={<ReporteEstudiante />} />
        <Route path="/estudiante/necesidades" element={<NecesidadesEspeciales />}/>
        <Route path="/estudiante/entrevista" element={<EntrevistaEstudiante />} />

        {/* ------ Subrutas Docente ------ */}
        <Route path="/docente/perfil" element={<PerfilDocente />} />
        <Route path="/docente/asistencia" element={<AsistenciaDocente />} />
        <Route path="/docente/solicitudes" element={<SolicitudesRecibidas />}/>
        <Route path="/docente/reportes" element={<ReportesDocente />} />
        {/* ------ Subrutas Asesor ------ */}
        <Route path="/asesor/registrar-caso" element={<RegistrarCaso />} />
        <Route path="/asesor/definir-ajustes" element={<DefinirAjustes />} />
        <Route path="/asesor/validar-ajustes" element={<ValidarAjustes />} />

        {/* ------ Flujo Asesor ------ */}
       <Route path="/asesor/seguimiento" element={<SeguimientoCaso />} />
       <Route path="/asesor/evaluacion-final" element={<EvaluacionFinal />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
