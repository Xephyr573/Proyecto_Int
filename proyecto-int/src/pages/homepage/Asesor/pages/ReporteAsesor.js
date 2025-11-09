import { useNavigate } from "react-router-dom";
import "./ReporteAsesor.css";

export default function ReporteAsesor() {
  const navigate = useNavigate();

  return (
    <div className="asesor-page">
      <h1>Reportes de Seguimiento</h1>
      <p>Resumen de entrevistas, fichas y asistencia de estudiantes asesorados.</p>

      <table className="asesor-table">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total de Estudiantes</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Entrevistas Realizadas</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Fichas Completas</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>

      <button className="asesor-btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
}
