import { useNavigate } from "react-router-dom";
import "./AsistenciaEstudiantes.css";

export default function AsistenciaEstudiantes(){
  const navigate = useNavigate();
  return (
    <div className="doc-page">
      <h1>Asistencia de Estudiantes</h1>
      <table className="doc-table">
        <thead><tr><th>Fecha</th><th>Estudiante</th><th>Tipo</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td>08/04/2025</td><td>Juan Pérez</td><td>Entrevista</td><td>Asistió</td></tr>
          <tr><td>10/04/2025</td><td>Camila Rojas</td><td>Clase</td><td>No Asistió</td></tr>
        </tbody>
      </table>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}