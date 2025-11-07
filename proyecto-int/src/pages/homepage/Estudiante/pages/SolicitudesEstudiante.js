import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./SolicitudesEstudiante.css";

export default function SolicitudesEstudiante() {
  return (
    <div className="page-container">
      <h1>Historial de Solicitudes</h1>

      {/* Filtros opcionales */}
      <div className="filters">
        <input type="text" placeholder="Buscar..." />
        <select>
          <option>Todos</option>
          <option>Pendiente</option>
          <option>Aprobada</option>
          <option>Rechazada</option>
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Solicitud</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/01/2025</td>
            <td>Apoyo Académico</td>
            <td><span className="state pending">Pendiente</span></td>
          </tr>
          <tr>
            <td>01/01/2025</td>
            <td>Material Adaptado</td>
            <td><span className="state approved">Aprobada</span></td>
          </tr>
          <tr>
            <td>01/01/2025</td>
            <td>Tiempo Adicional en Evaluaciones</td>
            <td><span className="state rejected">Rechazada</span></td>
          </tr>
        </tbody>
      </table>

      <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
