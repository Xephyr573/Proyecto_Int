import { useNavigate } from "react-router-dom";
import "./SolicitudesRecibidas.css";

export default function SolicitudesRecibidas(){
  const navigate = useNavigate();
  return (
    <div className="doc-page">
      <h1>Solicitudes Recibidas</h1>
      <table className="doc-table">
        <thead><tr><th>Fecha</th><th>Estudiante</th><th>Solicitud</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td>05/04/2025</td><td>Pedro Soto</td><td>Apoyo Visual</td><td>Pendiente</td></tr>
          <tr><td>07/04/2025</td><td>María Gómez</td><td>Tiempo Extra</td><td>Aprobada</td></tr>
        </tbody>
      </table>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}