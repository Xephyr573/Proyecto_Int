import { useNavigate } from "react-router-dom";
import "./AsistenciaDirector.css";

export default function AsistenciaDirector(){
  const navigate = useNavigate();
  return (
    <div className="dir-page">
      <h1>Asistencia Consolidada</h1>
      <table className="dir-table">
        <thead><tr><th>Fecha</th><th>Estudiante</th><th>Actividad</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td>10/04/2025</td><td>Alexander Torres</td><td>Entrevista</td><td>Asistió</td></tr>
          <tr><td>12/04/2025</td><td>Matias Soto</td><td>Clase de Apoyo</td><td>No Asistió</td></tr>
          <tr><td>15/04/2025</td><td>Benjamin Urra</td><td>Tutoría</td><td>Asistió</td></tr>
        </tbody>
      </table>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}