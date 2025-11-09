import { useNavigate } from "react-router-dom";
import "./AsistenciaEstudiantes.css";

export default function AsistenciaEstudiantes() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Asistencia de Estudiantes</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alexander Torres</td>
            <td>01/01/2025</td>
            <td>Asistió</td>
          </tr>
          <tr>
            <td>Matias Soto</td>
            <td>01/01/2025</td>
            <td>No Asistió</td>
          </tr>
        </tbody>
      </table>

      <button className="btn-back" onClick={() => navigate(-1)}>← Volver</button>
    </div>
  );
}
