import { useNavigate } from "react-router-dom";
import "./FichaEstudiantes.css";

export default function FichaEstudiantes() {
  const navigate = useNavigate();

  return (
    <div className="asesor-page">
      <h1>Fichas de Estudiantes</h1>

      <table className="asesor-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Observación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Benjamín Urra</td>
            <td>Avance académico positivo, necesita apoyo visual.</td>
            <td>07/11/2025</td>
          </tr>
          <tr>
            <td>Matias Soto</td>
            <td>Se mantiene constante en asistencia.</td>
            <td>05/11/2025</td>
          </tr>
        </tbody>
      </table>

      <button className="asesor-btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
}
