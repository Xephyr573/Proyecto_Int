import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./FichaEstudiante.css";

export default function FichaEstudiante() {
  return (
    <div className="page-container">
      <h1>Ficha del Estudiante</h1>
      <p>Aquí verás un resumen de observaciones y datos relevantes.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Asesor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/01/2025</td>
            <td>Buena evolución. Se recomienda reforzar material impreso ampliado.</td>
            <td>Sr. TantoTanto</td>
          </tr>
          <tr>
            <td>01/01/2025</td>
            <td>Entrevista inicial: se identifican necesidades visuales y de tiempo.</td>
            <td>Srta. TantoTanto</td>
          </tr>
        </tbody>
      </table>

      <div className="note">
        <strong>Nota:</strong> La ficha es de carácter reservado y solo visible para el estudiante y el equipo responsable.
      </div>

      <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
