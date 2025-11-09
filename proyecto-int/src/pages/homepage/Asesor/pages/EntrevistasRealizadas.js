import { useNavigate } from "react-router-dom";
import "./EntrevistasRealizadas.css";

export default function EntrevistasRealizadas() {
  const navigate = useNavigate();

  return (
    <div className="asesor-page">
      <h1>Entrevistas Realizadas</h1>

      <table className="asesor-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Fecha</th>
            <th>Modalidad</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Benjamín Urra</td>
            <td>04/11/2025</td>
            <td>Online</td>
            <td>Excelente disposición y participación activa.</td>
          </tr>
          <tr>
            <td>Matias Soto</td>
            <td>30/10/2025</td>
            <td>Presencial</td>
            <td>Se recomienda reforzar hábitos de estudio.</td>
          </tr>
        </tbody>
      </table>

      <button className="asesor-btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
}
