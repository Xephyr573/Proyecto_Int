import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./ReporteEstudiante.css";

export default function ReporteEstudiante() {
  return (
    <div className="page-container">
      <h1>Reporte General</h1>

      <section className="kpis">
        <div className="kpi">
          <h3>Asistencia a Entrevistas</h3>
          <strong>0%</strong>
        </div>
        <div className="kpi">
          <h3>Solicitudes Aprobadas</h3>
          <strong>0</strong>
        </div>
        <div className="kpi">
          <h3>Reuniones Pendientes</h3>
          <strong>0</strong>
        </div>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Promedio de asistencia</td><td>0%</td></tr>
          <tr><td>Solicitudes totales</td><td>0</td></tr>
          <tr><td>Última entrevista</td><td>00/00/2025</td></tr>
        </tbody>
      </table>

    <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
