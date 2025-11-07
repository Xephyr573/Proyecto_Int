import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./AsistenciaEstudiante.css";

export default function AsistenciaEstudiante() {
  return (
    <div className="page-container">
      <h1>Gestión de Asistencia</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/01/2025</td>
            <td>Entrevista</td>
            <td><span className="badge ok">Asistió</span></td>
          </tr>
          <tr>
            <td>01/01/2025</td>
            <td>Clase de Apoyo</td>
            <td><span className="badge no">No Asistió</span></td>
          </tr>
        </tbody>
      </table>

      <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
