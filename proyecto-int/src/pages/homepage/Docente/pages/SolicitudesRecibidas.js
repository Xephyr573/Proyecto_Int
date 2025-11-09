import { useNavigate } from "react-router-dom";
import "./SolicitudesRecibidas.css";

export default function SolicitudesRecibidas() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Solicitudes Recibidas</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Tipo Solicitud</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alexander Torres</td>
            <td>Apoyo Académico</td>
            <td>01/01/2025</td>
            <td>Pendiente</td>
          </tr>
          <tr>
            <td>Matias Soto</td>
            <td>Material Adaptado</td>
            <td>01/01/2025</td>
            <td>Aprobada</td>
          </tr>
        </tbody>
      </table>

      <button className="btn-back" onClick={() => navigate(-1)}>← Volver</button>
    </div>
  );
}
