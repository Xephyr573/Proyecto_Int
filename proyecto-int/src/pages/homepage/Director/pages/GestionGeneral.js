import { useNavigate } from "react-router-dom";
import "./GestionGeneral.css";

export default function GestionGeneral(){
  const navigate = useNavigate();
  return (
    <div className="dir-page">
      <h1>Gestión General</h1>
      <p>Supervisa los procesos de inclusión, asistencia y reportes institucionales.</p>

      <table className="dir-table">
        <thead><tr><th>Proceso</th><th>Estado</th><th>Última actualización</th></tr></thead>
        <tbody>
          <tr><td>Asignación de apoyos</td><td>En curso</td><td>07/04/2025</td></tr>
          <tr><td>Validación de entrevistas</td><td>Completado</td><td>05/04/2025</td></tr>
          <tr><td>Revisión de reportes</td><td>Pendiente</td><td>09/04/2025</td></tr>
        </tbody>
      </table>

      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}