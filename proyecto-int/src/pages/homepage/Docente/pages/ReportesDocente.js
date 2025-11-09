import { useNavigate } from "react-router-dom";
import "./ReportesDocente.css";

export default function ReportesDocente() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Reportes Académicos</h1>

      <p>Resumen de tus clases, asistencia y progreso de los estudiantes.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Asistencia Promedio</th>
            <th>Estudiantes Aprobados</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proyecto Integrado</td>
            <td>0%</td>
            <td>01/01</td>
          </tr>
          <tr>
            <td>Programación Backend</td>
            <td>0%</td>
            <td>01/01</td>
          </tr>
        </tbody>
      </table>

      <button className="btn-back" onClick={() => navigate(-1)}>← Volver</button>
    </div>
  );
}
