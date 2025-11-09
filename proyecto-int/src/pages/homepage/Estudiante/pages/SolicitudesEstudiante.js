import { useNavigate } from "react-router-dom";
import "./SolicitudesEstudiante.css";

export default function SolicitudesEstudiante(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Historial de Solicitudes</h1>

      <div className="filters">
        <input type="text" placeholder="Buscar..." />
        <select>
          <option>Todos</option>
          <option>Pendiente</option>
          <option>Aprobada</option>
          <option>Rechazada</option>
        </select>
      </div>

      <table className="est-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Solicitud</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>08/04/2025</td>
            <td>Apoyo Académico</td>
            <td><span className="state pending">Pendiente</span></td>
          </tr>
          <tr>
            <td>20/03/2025</td>
            <td>Material Adaptado</td>
            <td><span className="state approved">Aprobada</span></td>
          </tr>
          <tr>
            <td>10/03/2025</td>
            <td>Tiempo Adicional</td>
            <td><span className="state rejected">Rechazada</span></td>
          </tr>
        </tbody>
      </table>

      <button className="est-btn" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}
