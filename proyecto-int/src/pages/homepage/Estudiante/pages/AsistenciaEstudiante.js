import { useNavigate } from "react-router-dom";
import "./AsistenciaEstudiante.css";

export default function AsistenciaEstudiante(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Gestión de Asistencia</h1>

      <table className="est-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/03/2025</td>
            <td>Entrevista</td>
            <td><span className="badge ok">Asistió</span></td>
          </tr>
          <tr>
            <td>05/03/2025</td>
            <td>Clase de Apoyo</td>
            <td><span className="badge no">No Asistió</span></td>
          </tr>
        </tbody>
      </table>

      <button className="est-btn" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}
